import { Container, Inner, Section, Stack } from '@/components/layout';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';

export function RichTextSection() {
  return (
    <Section id='rich-text' spacing='default' tone='default'>
      <Container size='3xl'>
        <Inner direction='column' align='start' gap='8'>
          <Stack gap='4'>
            <p className='text-sm font-medium text-muted-foreground'>
              Rich Text Section
            </p>
            <Heading size='md'>
              Figma の値を、実装で扱いやすい責務へ翻訳する
            </Heading>
          </Stack>
          <Text size='lg'>
            Figma 上では Container に gap や flex が内包されていても、コードでは
            Container と Inner に分けます。
            これにより、横幅制御と内部レイアウトを独立して変更できます。
          </Text>
          <Text>
            Dev Mode の CSS はそのまま貼り付けず、Section / Container / Inner の
            props に変換して使います。
          </Text>
        </Inner>
      </Container>
    </Section>
  );
}
