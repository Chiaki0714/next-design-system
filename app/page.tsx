import { Container, Grid, Inner, Section, Stack } from "@/components/layout";
import { LpNavbar } from "@/components/sections/LpNavbar";
import { RichTextSection } from "@/components/sections/RichTextSection";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <LpNavbar />
      <main>
        <Section spacing="default" tone="muted">
          <Container size="7xl">
            <Inner direction="column" align="center" gap="12">
              <Stack align="center" gap="6" className="mx-auto max-w-[var(--container-3xl)]">
                <p className="text-sm font-medium text-muted-foreground">Layout Template</p>
                <Heading as="h1" size="xl">
                  Figma 参照型の Next.js レイアウト基盤
                </Heading>
                <Text size="lg">
                  Section / Container / Inner を分けて、Figma の wrapper を保守しやすいコードへ翻訳します。
                </Text>
                <Button size="lg">View Components</Button>
              </Stack>
            </Inner>
          </Container>
        </Section>

        <Section id="features" spacing="default" tone="default">
          <Container size="7xl">
            <Inner direction="column" gap="16">
              <Stack gap="4" className="max-w-[var(--container-3xl)]">
                <Heading size="md">Layout components</Heading>
                <Text>
                  Figma の Container 内包構造を、実装では責務ごとに分解します。
                </Text>
              </Stack>
              <Grid columns="3" gap="6">
                {["Section", "Container", "Inner"].map((title) => (
                  <article key={title} className="rounded-2xl border border-border bg-background p-6">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {title} の責務だけを持たせ、過剰な variant を避けます。
                    </p>
                  </article>
                ))}
              </Grid>
            </Inner>
          </Container>
        </Section>

        <RichTextSection />
      </main>
    </>
  );
}
