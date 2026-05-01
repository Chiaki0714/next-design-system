# Chiaki Design System Rulebook v1

## はじめに

このルールブックは、`Chiaki_Frontend_Rulebook_v13` をベースに、今後使用する Figma テンプレート（Tailwind / shadcn 系の Variables と Components を持つデザインシステム）へ合わせて再構成したものです。  
ファイル名は変わりますが、更新方法・粒度・判断基準は v13 の運用方針を引き継ぎます。

目的は、Figma で作成したデザインを、Next.js の実装へできるだけ迷わず・ズレなく落とし込むことです。  
shadcn の全コンポーネントを使うことが目的ではありません。あくまで、Figma 側の token / component / variant の考え方を、モダンな Web サイト制作に使いやすい形でコードへ接続します。

このルールブックでは、ルールを次の 3 層で整理します。

1. **Core Principles**  
   実装判断の土台になる普遍的な方針

2. **Shared Implementation Rules**  
   複数案件でも再利用しやすい設計・実装ルール

3. **Current Project Rules**  
   現在のサイト制作テンプレートにおける運用ルール

---

# Part 1. Core Principles

## 1. このプロジェクトで最優先すること

実装で迷った場合は、次の優先順位で判断します。

1. UI が自然であること
2. 実機スマホで安定すること
3. 保守しやすいこと
4. 横展開しやすいこと
5. 演出として気持ちよいこと

## 2. 基本方針

- 世界標準で見ても実務的な構成を優先する
- シンプルで責務が明確な構造にする
- 書き方・命名・構造をできるだけ統一する
- 見た目ではなく役割で設計する
- PC と SP で無理に同じ実装にしない
- 演出より UI の安定を優先する
- 将来のテーマ対応や横展開に備える
- 一時的な思いつきではなく、再現可能な実装基準に寄せる

## 3. 実装判断の共通原則

### まず単純な構成で成立させる

- まずは最小構成で成立するかを考える
- 過剰な抽象化・共通化はしない
- 必要性が明確になってから切り出す

### 局所化する

- 状態は必要な場所に閉じ込める
- GSAP や DOM 制御は必要な範囲に閉じ込める
- page 全体を慣習的に client component にしない

### 責務を混ぜない

- レイアウト責務
- 見た目責務
- 動き責務
- データ責務

これらをできるだけ分離する。

---

# Part 2. Shared Implementation Rules

## 1. Next.js / React 方針

App Router を前提に、React Component は **Server Component を基本** とします。  
Client Component は必要な責務がある場合にのみ採用します。

### Server Component を基本にする対象

- 静的なレイアウト
- 単純な UI 出力
- props を受けて描画するだけの presentational component
- `Link` を返すだけのカードや一覧 item

### Client Component にする対象

- `useState`
- `useEffect`
- `useLayoutEffect`
- `useRef` を使った DOM 制御
- GSAP
- ブラウザ API
- イベントや UI 状態を持つコンポーネント

### ルール

- まず Server Component で成立するかを考える
- 必要な箇所だけ Client Component に切り出す
- ページ全体を慣習的に `use client` にしない
- GSAP を使う責務は可能な限り局所化する

## 2. HTML / レイアウト設計

### 基本方針

ページ構造は、意味のある区画とレイアウト用の箱を分けて考える。  
見た目の都合だけで semantic 要素を増やさず、要素名と役割が一致する構造を優先する。

### 基本判断

- `main`
  - そのページの主要コンテンツ全体を包む
  - `header` / `footer` / 共通ナビゲーションは含めない
  - 原則として 1 ページに 1 つ

- `article`
  - その要素単体で、独立したコンテンツとして成立する場合に使う
  - ページ外に切り出しても意味が通るものに向く

- `section`
  - ページ内の意味ある区画に使う
  - ただし、単なる見た目調整やレイアウト都合だけでは使わない

- `div`
  - 意味づけを持たないレイアウト用の箱に使う
  - grid、flex、余白調整、装飾、ラッパーなどに使う

### 基本骨格

通常ページの標準形は、原則として以下を基本とする。

```tsx
<main className={styles.main}>
  <section className={styles.section}>
    <div className="container">
      <div className={styles.inner}>...</div>
    </div>
  </section>
</main>
```

ただし、これはあくまで **標準形** であり、唯一の正解ではない。  
ページ自体が独立した 1 コンテンツとして成立する場合は、`main > article` を許容する。

### 要素の役割

#### `main`

ページ固有の主要コンテンツ領域。  
`header` / `footer` は含めない。  
ページレベルの背景、文字色、最小高さを持たせてよい。

#### `article`

その要素単体で独立したコンテンツとして成立する場合に使う。  
1 本の実験ページ、記事、実績詳細など、ページ内で独立性が高い内容に向く。

#### `section`

ページ内の意味ある区画。  
Hero、About、Service、Story、FAQ、CTA など、ページを構成するまとまりに使う。  
単なるレイアウト都合だけの場合は `div` を使う。

#### `container`

横幅制御のための共通層。  
`max-width`、左右ガター、中央寄せを担当する。  
**display / grid / flex などのレイアウト責務は持たせない。**

#### `inner`

`container` の内側で内部レイアウトを担当する層。  
`flex` / `grid` / `gap` / columns などは `inner` 側に持たせる。

### 運用ルール

- `container` は global class として定義する
- `inner` は module.css に定義する
- 基本は `container > inner`
- class 分離のためだけに div を増やさない
- ただし、責務分離が明確になるネストは許容する
- semantic 要素を使うときは、要素名と中身の役割が一致しているかを確認する

### `container` を省略してよい場合

以下の場合は、無理に `container` を使わなくてよい。

- セクション全体が full-bleed の表現面そのものになっている
- 各セクション固有の構図や余白が主役で、共通の横幅制御が不要
- `container` を入れることで、かえって意味のない DOM が増える

### 補足

semantic 要素を増やすこと自体を目的にしない。  
重要なのは、要素名と役割が一致していること、および構造を後から読んだときに意図が分かることである。

## 3. CSS / Styling 方針

### 基本方針

このテンプレートでは、Figma Variables と Tailwind / CSS Modules を併用する。

- **Figma Variables**: token の正
- **globals.css**: Figma token の受け皿
- **Tailwind utility**: 基本的な余白・色・文字・レイアウト
- **CSS Modules**: 複雑な section / article / motion / 装飾
- **shadcn**: 必要な UI 部品だけ採用する

Tailwind を使う前提にはするが、すべてを Tailwind class だけで書く必要はない。  
LP やブランドサイトでは、section 単位の見た目・装飾・motion が増えるため、CSS Modules を併用する方が安定する。

### Next.js と CSS custom property の命名

CSS custom property は camelCase にしない。

#### OK

```css
--container-7xl
--section-padding-y
--heading-xl-font-size
```

#### NG

```css
--container7Xl
--sectionPaddingY
--headingXlFontSize
```

理由:

- CSS / Tailwind / shadcn の世界では kebab-case が標準
- Figma Variables の階層名とも対応しやすい
- Next.js でも CSS ファイル内の custom property は kebab-case で問題ない
- camelCase が必要になるのは、React の inline style object を直接書く場合のみ

#### 例外

```tsx
<div style={{ "--local-progress": progress } as React.CSSProperties} />
```

このように React の `style` object を使う場合でも、custom property 名自体は `--local-progress` のままでよい。

### CSS Modules 命名ルール

CSS Modules の class 名は camelCase を基本とする。

```css
.heroSection {}
.sectionHeader {}
.mediaFrame {}
```

ただし、global utility として定義するものは kebab-case とする。

```css
.site-container {}
.section-shell {}
```

### 命名の考え方

- 見た目ではなく役割で命名する
- 色名やサイズ名を class 名に入れない
- section ごとの構造が分かる名前にする
- Figma の layer 名と近い粒度にする

---

## 4. Global と Local の責務分離

### globals.css に置くもの

- Figma 由来の token
- Tailwind / shadcn が参照する theme token
- light / dark theme の semantic color
- breakpoint / container / radius / font / text scale
- 汎用的な body / focus / selection
- サイト全体で使う container / section の最小 utility

### module.css に置くもの

- ページ・section 固有のレイアウト
- 装飾的な背景
- grid / sticky / overlap などの複雑な構成
- motion の初期状態
- その section でしか使わない custom property

### 判断基準

複数ページで使い回すものは global。  
ひとつの section のためだけに存在するものは local。

### token / custom property 運用ルール

- Figma に存在する値は globals.css に寄せる
- local token は `--local-*` を基本にする
- local token を複数箇所で使い始めたら global 化を検討する
- 値を直接増やすより、既存 token に寄せられないか先に確認する

### local custom property を作ってよい例

```css
.hero {
  --local-image-offset: clamp(2rem, 6vw, 6rem);
}
```

### local custom property を作らない例

```css
.card {
  --local-radius: 18px;
}
```

この場合は Figma の `--radius-2xl` を使う。

---

## 5. Design Token System

### 基本方針

このテンプレートでは、Figma Variables を token の正とする。

```
Figma Variables
↓
globals.css
↓
Tailwind utility / CSS Modules
↓
Component / Section
```

### token の種類

#### Primitive token

Figma / Tailwind の基礎値。

```css
--spacing-6
--radius-2xl
--text-base
--font-sans
```

#### Semantic token

UI 上の役割を持つ値。

```css
--background
--foreground
--primary
--muted
--border
```

#### Project token

サイト制作で使いやすいように意味を持たせた値。

```css
--site-container-max
--section-padding-y
--container-padding-x
```

### 運用ルール

- 色は primitive ではなく semantic token を使う
- radius / text / container は Figma の値に合わせる
- 任意値は最終手段
- Figma にない値を追加する場合は、理由をルールブックか該当 CSS に残す

---

## 6. Width / Container 設計

### 基本ルール

container は Figma の `container/*` token を基準にする。  
以前の独自 breakpoint / max-width とは値が異なるため、今後は Figma 側に合わせる。

### 共通 token

```css
--container-3xs: 16rem;  /* 256px */
--container-2xs: 18rem;  /* 288px */
--container-xs: 20rem;   /* 320px */
--container-sm: 24rem;   /* 384px */
--container-md: 28rem;   /* 448px */
--container-lg: 32rem;   /* 512px */
--container-xl: 36rem;   /* 576px */
--container-2xl: 42rem;  /* 672px */
--container-3xl: 48rem;  /* 768px */
--container-4xl: 56rem;  /* 896px */
--container-5xl: 64rem;  /* 1024px */
--container-6xl: 72rem;  /* 1152px */
--container-7xl: 80rem;  /* 1280px */
```

### サイト用 container

```css
--site-container-max: var(--container-7xl);
--container-padding-x: 1.5rem;
```

### 基本例

```tsx
<section className={styles.section}>
  <div className="site-container">
    ...
  </div>
</section>
```

```css
.section {
  padding-block: var(--section-padding-y);
}
```

### container の使い分け

- `site-container`: 通常の section 幅
- `max-w-*`: card / text block / media など部品単位
- full bleed: 背景・横断ビジュアルなど、意図が明確な場合のみ

---

## 7. Responsive 設計

### 原則

- base は mobile / narrow layout
- min-width で段階的に拡張する
- size の変化は `clamp()`
- structure の変化は `@media`
- breakpoint と motion capability は分ける

### Figma breakpoints

```css
--breakpoint-sm: 40rem;  /* 640px */
--breakpoint-md: 48rem;  /* 768px */
--breakpoint-lg: 64rem;  /* 1024px */
--breakpoint-xl: 80rem;  /* 1280px */
--breakpoint-2xl: 96rem; /* 1536px */
```

### Tailwind class を使う場合

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
```

### CSS Modules を使う場合

```css
.grid {
  display: grid;
  gap: var(--spacing-6);
}

@media (min-width: 48rem) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

### breakpoint 運用ルール

- Figma と同じ値を使う
- 独自の 1200px / 1440px は原則追加しない
- どうしても必要な場合は section local の例外として扱う
- breakpoint を増やすより、container と clamp で吸収できないか先に確認する

---

## 8. Typography / Font 運用

### 基本方針

font family は Figma の定義に合わせて 3 種に絞る。

```css
--font-sans: "Geist", sans-serif;
--font-serif: Georgia, serif;
--font-mono: "Geist Mono", monospace;
```

heading ごとに font family を増やさない。  
heading の違いは、font-size / line-height / font-weight / letter-spacing で表現する。

### Next.js での font 読み込み

Next.js では `next/font` を使い、CSS variable へ接続する。

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

```css
:root {
  --font-sans: var(--font-geist-sans), sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}
```

### Text scale

Figma の text token に合わせる。

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 3.75rem;
--text-7xl: 4.5rem;
--text-8xl: 6rem;
--text-9xl: 8rem;
```

### Heading preset

サイト制作では、Figma の Custom Variables をもとに heading preset を用意してよい。

- `heading-sm`
- `heading-md`
- `heading-lg`
- `heading-xl`

ただし、これは component / section で使うための補助であり、font family を増やすためのものではない。

---

## 9. Color / Theme 設計

### 基本方針

色は shadcn 由来の semantic token を採用する。  
ただし、shadcn component を大量に使うためではなく、Figma と code の対応を安定させるために使う。

### 使用する基本 token

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

### Light / Dark

light / dark の値は `:root` と `.dark` で切り替える。

### 禁止事項

- `#fff` や `#000` を直接書かない
- 似た色を local に増やさない
- 透明度付きの黒白を何種類も増やさない
- Figma の Mode と異なる独自 dark theme を作らない

### Webサイト制作での補足

shadcn の `primary` / `secondary` だけではブランドサイトの表現が足りない場合がある。  
その場合は、Figma Variables に brand token を追加してから code に反映する。

#### OK

```css
--brand
--brand-foreground
--brand-muted
```

#### NG

```css
.hero {
  color: #2f6bff;
}
```

## 10. Accessibility / Interaction

### 基本方針

- 見た目だけで状態を伝えない
- semantic にも状態を伝える
- `button` の active 状態は必要に応じて `aria-pressed` を使う
- `aria-label` は本当に必要な場合のみ使う
- 既存テキストで十分伝わる場合は不要な上書きをしない
- focus 表示は消さず、`focus-visible` を基準に扱う

### hover / pointer ルール

- hover スタイルは `@media (hover: hover) and (pointer: fine)` の中でのみ書く
- touch 端末では hover を前提にしない
- touch 端末のフィードバックは `:active` を使う
- 選択状態や開閉状態は hover ではなく、React state / `data-state` / ARIA 属性で管理する
- `focus-visible` は hover と切り離して常に配慮する

### touch feedback の補助ルール

- `:active` は「押している瞬間の補助フィードバック」として扱う
- 見た目変化が知覚しづらい場合は、無理に scale を入れず border / background の変化だけでもよい
- 誤差レベルの scale 値違いのために token を増やさない

## 11. Viewport / Motion / Performance

### viewport 高さ

モバイル環境では `vh` 単独を前提にしない。

```css
min-height: 100vh;
min-height: 100svh;
min-height: 100dvh;
```

- 優先は `dvh`
- fallback として `vh` / `svh` を残す
- full-height section は、その section 自身に高さを持たせる

### reduced motion

`prefers-reduced-motion: reduce` には対応する。  
アニメーションや transition は極端に短縮し、不要な動きを避ける。

### パフォーマンス判断基準

- 軽い `filter` や単純な値計算のために慣習的に `useMemo` を使わない
- 本当に再計算コストが高い場合のみ `useMemo` を検討する
- `will-change` は常時指定しない
- transform / opacity アニメーションなど、効果が明確な対象に限定する

---


## 12. Component / Section 設計

### 基本方針

このテンプレートの主役は shadcn component ではなく、Web サイト用の section / article / media / layout component である。

shadcn は以下の用途で使う。

- Button
- Badge
- Dialog
- Accordion
- Tabs
- Form 周り
- Dropdown / Popover など UI 挙動が複雑なもの

一方で、以下は無理に shadcn 化しない。

- Hero section
- Feature section
- Case study section
- Pricing section
- CTA section
- Gallery section
- Story / About section

これらは CSS Modules と Figma token を使って、サイトごとに美しく作る。

### Figma component と code component の対応

Figma の component をそのまま code component にする必要はない。  
ただし、variant と token の対応は揃える。

#### OK

- Figma: Button / size / variant
- Code: `Button` の `variant` / `size`

#### OK

- Figma: Hero visual の layout variant
- Code: `HeroSection` の props ではなく、ページごとの CSS Modules で調整

### section component の考え方

section は「見た目のまとまり」ではなく「情報のまとまり」で分ける。

```tsx
<section className={styles.section} aria-labelledby="features-title">
  <div className="site-container">
    <header className={styles.sectionHeader}>
      <p className={styles.eyebrow}>Features</p>
      <h2 id="features-title">...</h2>
    </header>
  </div>
</section>
```

### media の使い方

画像・動画・canvas・iframe は必ず media wrapper を持たせる。

```tsx
<figure className={styles.media}>
  <Image src={src} alt="" fill />
</figure>
```

```css
.media {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  background: var(--muted);
}
```

### motion の考え方

motion は layout を壊さない範囲で足す。  
まず静的に成立させ、その後に motion を追加する。

- opacity
- transform
- clip-path
- filter

これらを中心に使い、width / height / top / left の連続変更は避ける。

---

# Part 3. Current Template Rules

## 1. プロジェクト概要

現在進めているのは **Next.js サイト制作テンプレート** です。  
GSAP の実験ページを増やしながら、後から見返しても分かりやすく、保守しやすく、必要に応じてポートフォリオにも転用できる構成を保つことを目的とします。

このプロジェクトは単なる学習用サンプル置き場ではなく、今後の自分の実装基準を整理し、実案件へ横展開するための基準プロジェクトとして扱います。

## 2. ディレクトリ運用

### app 配下

公開中、または Home に載せる実験だけを `app/experiments` に置く。

```txt
app/
  experiments/
    horizontal-scroll/
    section-switch-layout/
    vertical-card-flow/
    parallax-layout/
```

### archive 配下

今は使わないが残しておきたいもの、没案、試作段階のものは `archive` に移す。

```txt
archive/
  experiments/
    old-scrub-layout/
    trial-01/
```

### 基本ルール

- `app` の中 = 現在見せるもの
- `archive` の中 = 保管用
- 完全に不要になったものは削除し、必要に応じて Git 履歴で追う

## 3. 命名ルール

### フォルダ名 / href

フォルダ名や URL は、内容ではなく **構造と挙動** で命名する。

推奨例:

- `horizontal-scroll`
- `section-switch-layout`
- `vertical-card-flow`
- `parallax-layout`

### タイトル

Home で認識しやすいよう、タイトルも内容依存を避ける。

推奨例:

- `Horizontal Scroll`
- `Section Switch Layout`
- `Vertical Card Flow`
- `Parallax Layout`

### 説明文

説明文は「何の内容か」ではなく、「どういう構造と動きか」を記述する。

推奨例:

- `Pinned horizontal layout with scrubbed panel translation`
- `Pinned content layout with state-based section switching and progress indicator`
- `Pinned card layout with vertical progress sync and scrubbed inner flow`
- `Full-bleed, split, and inset media layouts with scrubbed image parallax`

## 4. Registry / Data 配置

### experiments registry

Home 用メタデータは `app/experiments/_registry/experiments.ts` に集約する。

ここに置くもの:

- `title`
- `description`
- `href`
- `tags`

ここに置かないもの:

- 実験ページ固有の JSX
- 各ページ固有の step データ本文
- 長いロジック

### ページ専用データ

そのページ専用のデータは、そのページのフォルダに同居させる。

```txt
app/experiments/section-switch-layout/
  page.tsx
  page.module.css
  steps.tsx
```

### ルール

- 専用のものは同じフォルダ
- 共有するものだけ共通化する
- 画像だけを切り出す場合は `images.ts`
- セクション全体データなら `sections.ts`

## 5. experiments ページの基本構造

experiments の子ページでは、ページ全体が 1 本の独立した実験として成立する場合、最外層に `article` を使ってよい。  
そのうえで、内部は `header / section / footer` のように意味ある区画へ分ける。

ただし、すべてのページで機械的に `article` を使うのではなく、ページ全体の独立性に応じて判断する。  
通常の区画ページとして扱う方が自然な場合は `section` を使ってよい。

## 6. GSAP / ScrollTrigger 実装方針

### GSAP は `useGSAP` に統一する

GSAP 実装は原則 `useGSAP` を使う。  
cleanup を統一しやすく、`scope` によって DOM 探索範囲を限定しやすいため。

### DOM 取得は root 配下に限定する

避ける書き方:

```ts
document.querySelector(...)
```

推奨する書き方:

```ts
const root = rootRef.current;
root?.querySelector(...);
gsap.utils.toArray(selector, root);
gsap.utils.selector(root);
```

### cleanup

GSAP / ScrollTrigger / ticker / listener は、`useGSAP` または effect の `return` で必ず cleanup する。

### ScrollTrigger の使い分け

#### `gsap.to` / `gsap.fromTo`

アニメーション自体が主役のときに使う。

用途:

- parallax
- fade
- 単体要素の reveal

#### `ScrollTrigger.create`

監視や状態管理が主役のときに使う。

用途:

- pin
- progress 監視
- dataset 更新
- state switch

#### `timeline + scrollTrigger`

複数演出を一本の流れで管理したいときに使う。

用途:

- 横スクロール
- 連続演出
- 一連のモーション制御

### Desktop Motion Gating の適用

pin / scrub / fullscreen reveal / horizontal translation のような PC 専用演出は、`Desktop Motion Gating` の条件に従って ON / OFF を判定する。

- CSS は shared breakpoint で構造を切り替える
- JS は `MEDIA_QUERIES.desktopMotion` で desktop 専用演出を有効化する
- mobile / tablet では静的レイアウトとして成立させる

### 実装整理ルール

- hook 化は必要性が明確になるまで行わない
- まずは同一ファイル内で小関数に分けて責務を整理する
- 定数は意味のある名前でファイル上部に置く
- 描画・進捗計算・active state 更新・end 計算を読み分けられる構造にする

## 7. Lenis / Scroll 管理

### Lenis は Provider で一元管理する

`LenisProvider` に次を集約する。

- Lenis 初期化 / destroy
- GSAP ticker 連携
- `ScrollTrigger.update` 連携
- route change 時の scroll reset
- `ScrollTrigger.config(...)`
- 端末特性に応じた Lenis ON / OFF 判定

### グローバル設定はページごとに書かない

例:

- `ScrollTrigger.config({ ignoreMobileResize: true })`

こうした設定は Provider 側でまとめて管理する。

### Lenis の ON / OFF 方針

- `prefers-reduced-motion: reduce` → OFF
- `pointer: coarse` かつ `hover: none` → OFF
- それ以外の desktop / laptop 環境 → ON

### scroll restoration 方針

- 同一ページのリロード時はブラウザ標準を尊重する
- App Router 内のページ遷移時は先頭へ reset する
- reset 後に `ScrollTrigger.refresh()` を行い、計測を整える

### route change 時の reset

- `lenis.scrollTo(0, { immediate: true })`
- `window.scrollTo(0, 0)`
- `document.documentElement.scrollTop = 0`
- `document.body.scrollTop = 0`
- `ScrollTrigger.clearScrollMemory?.()`
- 必要に応じて `requestAnimationFrame` 後に `ScrollTrigger.refresh()`

### Lenis と Desktop Motion の整合

Lenis の ON / OFF も、原則として Desktop Motion Gating と矛盾しない条件で運用する。  
PC 専用の重いスクロール演出を使わない環境では、native scroll を優先する。

## 8. Parallax 実装ルール

parallax では trigger と target を分けて考える。

- trigger = `.media`
- target = `.mediaImage`

動きの強さは `data-depth` で管理する。

- `1.0` = 標準
- `1 未満` = 弱め
- `1 より大きい` = 強め

Desktop Motion Gating に該当しない環境では、parallax の transform をリセットし、静的表示に戻す。

## 9. Home ページ運用

Home は実験ページの一覧 UI として扱う。  
そのため、ScrollTrigger による重い演出よりも、一覧としての軽さ、可読性、絞り込みやすさを優先する。

### Home で優先すること

- 一覧性
- 可読性
- 絞り込みやすさ
- 軽さ
- 実験追加のしやすさ

### アニメーション方針

Home のカード一覧では、基本的に `ScrollTrigger.batch()` を使わない。  
初回表示やフィルタ切り替えは、`gsap.set` + `gsap.to` のみで軽く見せる。

### 現時点の基準

- `autoAlpha: 0 -> 1`
- `y: 18 -> 0`
- `duration: 0.65`
- `stagger: 0.06`
- `ease: 'power2.out'`

### reduced motion

`prefers-reduced-motion: reduce` の端末では一覧アニメーションを即表示に切り替える。

### 幅とグリッド

Home の幅は global の `container` 系 class と page.module.css 側の `.inner` で構成する。  
最大幅の基準には global token の `--container-wide` を使う。

カードグリッド基準:

- SP: 1 列
- `48rem` 以上: 2 列
- `64rem` 以上: 3 列

### Empty State

タグに紐づく項目が 0 件のときは、カード風に強く見せない。  
border や background を強く付けず、補足テキストとして控えめに見せる。  
横幅は `56ch` 前後に抑える。

### 実装補足

- `EXPERIMENTS.filter(...)` 程度の軽い計算には慣習的に `useMemo` を使わない
- tag hover のような局所調整値は local custom property でよい
- tag / card / back button のように複数ファイルで繰り返す interaction 値のみ global token 化を検討する

## 10. Playground の考え方

このプロジェクトは実験サイトであるため、何でも共通データ化することを目的にしない。

### 外に出す判断基準

- 画像だけ → `images.ts`
- 各ページ専用の長い本文 → そのページ専用ファイル
- Home 用メタデータ → `_registry/experiments.ts`
- 軽い固定文言 → `page.tsx` 直置きでも可

### 原則

構造として共通化すべきものと、ページ固有の文脈として残すべきものを分けて整理する。

### steps / page専用データの扱い

- ページ専用の `steps.tsx` は、そのページフォルダ内に同居させてよい
- 完全な純データ化を目的にしない
- `ReactNode` を使う柔軟性は許容する
- ただし、本文の見た目統一が必要な場合は `StepParagraph` / `StepNote` のような小さな presentational component を使う

---

# Appendix. Rulebook Update Policy

## 更新方針

このファイルは `Chiaki Frontend Rulebook v13` を基準版とする。  
今後ルールを更新する場合は、単なる追記ではなく、次の原則で更新する。

### 1. 競合する方針は上書きする

古い方針と新しい方針が競合する場合は、両方を残さない。

### 2. 検証中の内容は本文に入れない

まだ再利用性が確定していない試行は本文に入れず、基準化できた段階で反映する。

### 3. 案件固有の内容は Part 3 に限定する

- 案件をまたいで使える内容 → Part 1 / Part 2
- 現在のプロジェクトだけに有効な内容 → Part 3

### 4. token 変更時は値まで明記する

spacing / typography / color などの token を更新する場合は、名前だけでなく値まで本文に反映する。

### 5. ルール変更時は version を上げる

表現修正のみなら version を上げなくてもよい。  
実質的な方針変更がある場合は version を更新する。

### 6. 更新履歴を末尾に残す

最低限、次の情報を記載する。

- version
- 更新日
- 変更概要

---

## 更新履歴

### DesignSystem v1

- `Chiaki_Frontend_Rulebook_v13` をベースに新規ファイルとして再構成
- Figma Variables / Tailwind / shadcn 系テンプレートへの接続方針を追加
- breakpoint / container / typography / color token を Figma 準拠へ変更
- Core Principles / Shared Implementation Rules / HTML / media / motion の基本方針は継承

### v13

- 更新日: 2026-04-11
- HTML / レイアウト設計に `main / article / section / div` の基本判断を追加
- `article` を独立コンテンツ、`section` をページ内区画として整理
- 基本骨格を `main > section > container > inner` の標準形として再明記
- `container` を省略してよい条件を補足
- experiments ページの基本構造に `article` 許容ルールを追加
- semantic 要素の使い分け方針を読みやすく再整理

### v12

- 更新日: 2026-04-11
- HTML / レイアウト設計の基本骨格を再整理
- `wrapper` を基本構造から廃止
- `section` をページ内の意味ある区画として再定義
- `container` の責務を横幅制御のみに限定
- `inner` レイヤーを正式ルールとして追加
- `container + content` 同居ルールを廃止
- Part 2 と Part 3 の競合を解消
- full-bleed の縛りすぎる記述を削除

### v11

- 更新日: 2026-04-11
- HTML / レイアウト設計の基本骨格を見直し、`main > wrapper > container` から `main > section > container` へ変更
- `wrapper` を基本構造から廃止し、意味のある区画は `section` に統一
- `container` の責務を「横幅制御（max-width / gutter / 中央寄せ）」のみに限定し、レイアウト責務を分離
- `content` レイヤーを新設し、`flex` / `grid` / `gap` などの内部レイアウト責務を担当する構造に整理
- `container` と `content` を同一要素に併記する運用を正式ルールとして追加
- class 分離のみを目的とした不要な DOM ネストを禁止し、「構造上意味がある場合のみネストを許可する」ルールを明文化
- full-bleed 表現について、`container` 内での実装を禁止し、DOM 構造で分離する方針を補足として追加
- 既存ルールとの競合を解消し、レイアウト設計における責務分離の一貫性を強化

### v10

- 更新日: 2026-04-07
- v9 のルール内容は維持したまま、章構成と記述順を整理
- token / responsive / motion / interaction の関連ルールを近接配置し、重複参照を減らした
- v9 の内容整理に加えて、media query 運用の改善提案を別紙で扱いやすい形に分離した
- breakpoint と capability 判定の役割分離を、Responsive / Desktop Motion Gating / GSAP / Lenis の間で読みやすく再整理
- Rulebook Update Policy の基準 version を v10 に更新

### v9

- 更新日: 2026-04-07
- `globals.css` の最新 token に合わせて color / semantic token 記述を更新
- `--control-fg` を削除し、1:1 alias token を持たない方針と整合させた
- alpha variation の整理方針を Color / Theme 設計に反映
- foreground と text token の役割分離を明文化
- 将来の可能性だけで token を増やさない方針を token 運用ルールへ追加
- Rulebook Update Policy の基準 version を v9 に更新

### v8

- 更新日: 2026-04-02
- Global / Local の責務分離に token / custom property 運用ルールを追加
- 1:1 の token alias を作らない方針を明文化
- global token で足りる場合は直接使う方針を追加
- local custom property を構造寸法・計算用・複数参照値に限定
- 既存 token に十分近い値は統合し、新規 token を増やさない方針を追加
- color token の使い方を整理し、ページ専用 color token の増殖を避ける方針を追加
- GSAP 実装整理ルールを追加
- Home / steps / interaction token 運用の補足を追加

### v7

- 更新日: 2026-03-31
- Responsive 設計に shared breakpoints ルールを追加
- breakpoint を `48rem / 64rem / 75rem / 90rem` に統一
- Desktop Motion Gating を追加
- GSAP の有効条件を `breakpoint + capability + reduced motion` に統一
- Home のグリッド基準を shared breakpoint に更新
- GSAP / Lenis / parallax の運用方針に Desktop Motion Gating との整合ルールを追加

### v6

- 更新日: 2026-03-28
- shared breakpoint の追記を追加
- ブレイクポイントの乱立を避ける方針を明文化
- app 全体で使用する breakpoint を `48rem / 64rem / 75rem / 90rem` に統一
- Home のグリッド基準を shared breakpoint ベースへ整理

### v5

- 更新日: 2026-03-25
- Part 構成を `Core Principles / Shared Implementation Rules / Current Project Rules` に再編
- 重複していた内容を整理し、判断基準と実装ルールを分離
- `Next.js / React`、`レイアウト`、`CSS`、`token`、`アクセシビリティ` の順に再配置
- Project 固有ルールを `Current Project Rules` に集約
- Home / Lenis / GSAP / Registry の位置づけを整理
- 読み順を「思想 → 共通実装 → 現案件」に統一

### v4

- 更新日: 2026-03-22
- primitive / semantic token の設計を追加
- radius / motion / blur / control / panel / ui-line / ui-dot token を明記
- カラー設計を OS テーマ対応前提に更新
- `dummy-*` token を廃止
- viewport 高さと full-height section の扱いを整理
- ダミー section とメイン section の背景差の考え方を更新

### v3

- 更新日: 2026-03-20
- OSテーマ対応を正式ルール化
- globals.css の token ベーステーマ切り替え方針を追加
- viewport 高さ（vh / svh / dvh）ルールを追加

### v2

- 更新日: 2026-03-18
- `Next.js / React の基本方針` を追加
- `アクセシビリティ運用ルール` を追加
- `hover / pointer 運用ルール` を追加
- `パフォーマンス判断基準` を追加
- Home の幅ルールを `.container` + `--container-wide` 方針に更新
- Lenis / ScrollTrigger の scroll restoration 方針を実装に合わせて更新

### v1

- 更新日: 2026-03-16
- 初版作成
- General Coding Rules と Current Project Context を統合
- 最新の `globals.css` に合わせて token 設計を反映
- Rulebook Update Policy を追加
