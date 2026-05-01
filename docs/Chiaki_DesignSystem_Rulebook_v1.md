# Chiaki Design System Rulebook v1

## はじめに

このルールブックは、既存の `Chiaki_Frontend_Rulebook_v13` をベースにしつつ、今後使用する Figma テンプレートに合わせて全面的に再整理したものです。

v13 は、Next.js + GSAP Playground を安定して育てるための実装基準として有効でした。  
ただし、今回からは **Figma 側に Tailwind / shadcn を前提にした完成度の高いデザインシステムが存在する** ため、コード側の基準も Figma の Variables / Components / Theming に寄せる必要があります。

そのため、このファイルは `Chiaki_Frontend_Rulebook_v14` ではなく、別系統の `Chiaki Design System Rulebook v1` として新規作成します。

目的は、書き方を増やすことではなく、**Figma から実装までの判断を減らすこと** にあります。

このルールブックでは、ルールを次の 3 層で整理します。

1. **Core Principles**  
   実装判断の土台になる普遍的な方針

2. **Design System Rules**  
   Figma / Tailwind / shadcn を接続するための設計ルール

3. **Implementation Rules**  
   実際の Next.js / React 実装で守るルール

---

# Part 1. Core Principles

## 1. このテンプレートで最優先すること

実装で迷った場合は、次の優先順位で判断します。

1. Figma の見た目・設計意図と一致していること
2. shadcn / Tailwind の標準的な書き方から外れないこと
3. 実機スマホで安定すること
4. 保守しやすいこと
5. 横展開しやすいこと
6. 必要な場合のみ演出を加えること

## 2. 基本方針

- Figma Variables をデザイントークンの正とする
- Tailwind / shadcn の命名に寄せる
- 独自トークンを増やす前に、Figma 側に既存の値がないか確認する
- 見た目ではなく役割で設計する
- PC と SP で無理に同じ実装にしない
- page 全体を慣習的に client component にしない
- コンポーネントの variant は Figma と code で対応させる
- 一時的な見た目調整より、再利用できる設計を優先する

## 3. 実装判断の共通原則

### まず Figma の構造を見る

- 使用されている Variables を確認する
- Component / Variant / Property を確認する
- Auto Layout の方向・gap・padding を確認する
- breakpoint / container の意図を確認する

### まず Tailwind で成立させる

- token 化されている値は Tailwind utility を使う
- `style={{}}` は原則使わない
- 任意値は最後の手段にする

### 局所化する

- 状態は必要な場所に閉じ込める
- DOM 制御やアニメーションは必要な範囲に閉じ込める
- page に責務を集めすぎない

### 責務を混ぜない

- レイアウト責務
- 見た目責務
- 動き責務
- データ責務
- CMS / 外部データ責務

これらをできるだけ分離する。

---

# Part 2. Design System Rules

## 4. Figma と Code の接続方針

このテンプレートでは、次の流れを基本とします。

```txt
Figma Variables
  ↓
globals.css / @theme
  ↓
Tailwind utilities
  ↓
shadcn components
  ↓
Page / Section implementation
```

Figma と code の間で値がずれた場合は、原則として **Figma Variables を優先**します。  
ただし、実装上の制約やアクセシビリティ上の問題がある場合は、Figma 側も含めて調整します。

## 5. globals.css の役割

`globals.css` は、見た目を直接作り込む場所ではありません。

主な役割は次の通りです。

- Tailwind v4 の `@theme` 定義
- shadcn が参照する CSS variables の定義
- light / dark theme の切り替え
- body / html / focus / reduced motion などの最低限の base style
- 複数箇所で繰り返す layout utility の定義

ページ固有の見た目や一回限りの装飾を `globals.css` に追加しないこと。

## 6. Color Token

カラーは shadcn の role token を基本にします。

```css
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
```

### 使い方

- 背景: `bg-background`, `bg-card`, `bg-muted`
- 文字: `text-foreground`, `text-muted-foreground`
- 線: `border-border`
- focus: `ring-ring`
- ボタンや重要 CTA: `bg-primary text-primary-foreground`

### 禁止

```tsx
<div className="text-[#171717]" />
<div className="bg-white" />
<div className="border-[#e5e5e5]" />
```

### 例外

ロゴ、ブランド専用色、外部サービス由来の色など、Figma Variables に存在しない理由が明確なものは例外にできます。  
その場合も、まず Figma 側に token として追加できるかを検討します。

## 7. Font Family

Figma の Theme では font family は次の 3 種類です。

```css
--font-sans: Geist
--font-serif: Georgia
--font-mono: Geist Mono
```

基本は `--font-sans` を使用します。

heading ごとに font family を増やすのではなく、見出しの違いは以下で表現します。

- font-size
- line-height
- font-weight
- letter-spacing

### 方針

- font family は増やさない
- 日本語サイトでは fallback に `Noto Sans JP` などを含める
- heading token は font family ではなく typographic preset として扱う

## 8. Text Scale

Figma の text token は Tailwind の標準 scale と一致させます。

```txt
xs   12 / 16
sm   14 / 20
base 16 / 24
lg   18 / 28
xl   20 / 28
2xl  24 / 32
3xl  30 / 36
4xl  36 / 40
5xl  48 / 48
6xl  60 / 60
7xl  72 / 72
8xl  96 / 96
9xl  128 / 128
```

### 実装ルール

- 本文は `text-sm` または `text-base` を基本にする
- 小さい補足は `text-xs` を使う
- 見出しは Figma の Custom heading token または Tailwind text scale を使う
- `text-[13px]` のような任意値は原則使わない

## 9. Breakpoint

Figma の breakpoint は次の値です。

```txt
sm  640px
md  768px
lg  1024px
xl  1280px
2xl 1536px
```

既存 v13 では独自 breakpoint がありましたが、この Design System では Figma / Tailwind 標準に合わせます。

### 実装ルール

- mobile first で書く
- 構造が変わる時だけ breakpoint を使う
- サイズ調整だけなら text scale / spacing / container で吸収する
- `max-width` media query は例外扱いにする

## 10. Container

Figma の container token は次の値です。

```txt
3xs 256px
2xs 288px
xs  320px
sm  384px
md  448px
lg  512px
xl  576px
2xl 672px
3xl 768px
4xl 896px
5xl 1024px
6xl 1152px
7xl 1280px
```

### 実装ルール

- section の基本最大幅は `container-7xl` を上限にする
- テキスト中心の領域は `container-prose` または `max-w-*` を使う
- ページごとに `1440px` や `1600px` を独自定義しない
- 必要な場合は Figma 側に container token を追加してから code に反映する

## 11. Radius

Figma の radius token を使用します。

```txt
xs  2px
sm  6px
md  8px
lg  10px
xl  14px
2xl 18px
3xl 22px
4xl 26px
```

### 実装ルール

- component は Figma の radius に合わせる
- pill 形状だけは `rounded-full` を使用してよい
- 独自の `rounded-[13px]` は使わない

## 12. Custom Variables

Figma の Custom collection には、section / heading などの実装に近い値があります。

```txt
container-padding-x: 24px
section-padding-y: 96px

section-title-gap-sm: 16px
section-title-gap-md: 20px
section-title-gap-lg: 20px
section-title-gap-xl: 24px
```

heading は以下の preset として扱います。

```txt
heading-sm 24 / 32 / 600 / -0.6px
heading-md 36 / 40 / 600 / -0.9px
heading-lg 48 / 48 / 600 / -1.2px
heading-xl 60 / 60 / 600 / -1.5px
```

### 方針

- section padding はまず `section-y` を使う
- container の左右 padding は `--container-padding-x` を使う
- heading は必要に応じて `.heading-sm` などの utility を使う
- Figma にない heading preset を勝手に増やさない

---

# Part 3. Component Rules

## 13. shadcn component を基本にする

Button / Badge / Card / Dialog / Input などは shadcn の構成を基本にします。

既存 component を大きく崩して作るのではなく、次の順で考えます。

1. shadcn の default component で成立するか
2. variant の追加で成立するか
3. slot / className の調整で成立するか
4. 新規 component として切り出す必要があるか

## 14. Variant は Figma と一致させる

Figma 側で variant を追加した場合は、code 側の `cva()` にも同じ意図の variant を追加します。

### 例

Figma の Button に `warning` variant を追加した場合：

```tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        outline: "...",
        secondary: "...",
        ghost: "...",
        link: "...",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
    },
  }
)
```

ただし、`warning` の色が Figma Variables に存在しない場合は、先に Figma 側で token を設計します。

## 15. Component 変更時のルール

component を変更するときは、以下を確認します。

1. Figma の component / variant と一致しているか
2. globals.css の token で表現できるか
3. Tailwind utility で表現できるか
4. variant として再利用する価値があるか
5. page 固有の見た目を component に混ぜていないか

## 16. 新規 component 作成ルール

新規 component を作る場合は、次の条件を満たすこと。

- 2 箇所以上で再利用される可能性がある
- Figma 側に同等の component または pattern がある
- props の責務が明確である
- variant が増えても破綻しない
- page 固有の文脈を持ち込まない

### ディレクトリ例

```txt
src/
  components/
    ui/
      button.tsx
      badge.tsx
      card.tsx
    layout/
      site-header.tsx
      site-footer.tsx
    sections/
      hero-section.tsx
      feature-section.tsx
```

---

# Part 4. Implementation Rules

## 17. className の書き方

Tailwind class は、できるだけ役割ごとに並べます。

```tsx
<div
  className="
    flex items-center justify-between
    gap-4
    rounded-xl border bg-card p-6
    text-card-foreground
  "
>
```

推奨順序は次の通りです。

1. layout
2. spacing
3. sizing
4. typography
5. color
6. border / radius
7. shadow / effect
8. responsive
9. state

## 18. 任意値の扱い

任意値は原則禁止です。

```tsx
// NG
<div className="w-[342px] text-[13px] bg-[#fafafa]" />
```

ただし、以下は例外として使用できます。

- 外部埋め込みの制御
- アニメーション上どうしても必要な座標
- Figma に一時的に token 化されていない検証中の値

例外で使った任意値は、後で token 化するか削除します。

## 19. CSS Modules / global CSS の扱い

基本は Tailwind utility を使います。

CSS Modules を使うのは以下の場合のみです。

- 複雑な疑似要素
- Tailwind では読みづらい keyframes
- component 内に閉じた特殊な表現
- 外部ライブラリの上書き

`globals.css` に page 固有 style を置かないこと。

## 20. レスポンシブ実装

レスポンシブは mobile first で書きます。

```tsx
<section className="grid gap-6 md:grid-cols-2 lg:gap-10">
```

### 方針

- base はスマホ
- `md:` 以上で構造を変える
- `lg:` 以上で余白や grid を広げる
- `2xl:` は必要な場合だけ使う

## 21. Section 実装

section は基本的に次の構造にします。

```tsx
<section className="section-y">
  <div className="container-page">
    ...
  </div>
</section>
```

### 方針

- section の上下余白は `section-y`
- 横幅は `container-page`
- テキスト中心なら `container-prose`
- section ごとに異なる container 幅を乱立させない

## 22. Animation / GSAP

演出は UI の安定より優先しません。

### 原則

- まず静的状態で成立させる
- その後に演出を加える
- motion は局所化する
- `prefers-reduced-motion` を尊重する
- scroll trigger は section 単位で閉じる

### 禁止

- page 全体を client component にする
- DOM 参照を広範囲に持つ
- layout の成立を animation に依存させる

---

# Part 5. Figma to Code Workflow

## 23. 実装前チェック

実装前に以下を確認します。

- 使用している color token
- 使用している text token
- 使用している container
- 使用している spacing / gap
- component variant
- dark mode の有無
- responsive の変化点

## 24. 実装手順

基本手順は次の通りです。

1. Figma の Auto Layout 構造を見る
2. Variables を確認する
3. shadcn component で使えるものを探す
4. Tailwind utility で再現する
5. 必要なら component variant を追加する
6. page 固有の調整は section 内に閉じる
7. 実機幅で確認する

## 25. Figma 側を変更した場合

Figma の Variables / Components を変更した場合は、必ず code 側も更新します。

### 更新対象

- `globals.css`
- shadcn component variants
- section utility
- rulebook
- 必要に応じて token export JSON

### 更新メモ

変更理由が後から分かるように、PR / commit / rulebook のいずれかに残します。

## 26. Code 側を変更した場合

code 側で token や variant を変更したくなった場合は、先に Figma 側に同じ変更が必要か確認します。

### 原則

- code だけで token を増やさない
- code だけで variant を増やさない
- 一時対応の場合はコメントを残す
- 汎用化できる場合は Figma に戻す

---

# Part 6. File Policy

## 27. globals.css

`globals.css` は次の構成を維持します。

```txt
1. @import
2. comment / source information
3. @theme
4. :root
5. .dark
6. @layer base
7. @layer utilities
8. reduced motion
```

## 28. Rulebook 更新ルール

この rulebook を更新する場合は、以下を守ります。

- 既存の温度感・粒度を大きく変えない
- 英語だけの章を増やさない
- なぜ変更したかを残す
- token 値を変更した場合は Figma 由来か明記する
- 追記で済まない場合は新しい major version として分ける

## 29. 今回の移行で変更した主な点

`Chiaki_Frontend_Rulebook_v13` からの主な変更点は次の通りです。

- breakpoint を既存独自値から Figma / Tailwind 標準に変更
- container を Figma Variables に合わせて再定義
- color を shadcn role token に統一
- font family を `sans / serif / mono` の 3 系統に整理
- heading を font family ではなく preset として扱う方針に変更
- globals.css を page design 用ではなく design token 接続用として再定義
- Figma component variant と code variant の同期ルールを追加

---

# Part 7. 最後に

このルールブックの目的は、制作の自由度を下げることではありません。

むしろ、毎回迷うべきではない判断を減らし、  
デザイン・実装・保守のどこでも同じ基準で進められるようにするためのものです。

Figma テンプレートの完成度が高い場合は、無理に自作の design system を上書きする必要はありません。  
コード側を Figma に寄せ、必要な差分だけを project rule として足していく方が安定します。
