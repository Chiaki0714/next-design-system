import { Container, Inner, Section } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function LpNavbar() {
  return (
    <Section
      as='header'
      spacing='nav'
      tone='default'
      className='sticky top-0 z-50 border-b border-border/70 backdrop-blur'
    >
      <Container size='7xl'>
        <Inner direction='row' align='center' justify='between' gap='6'>
          <Link href='/' className='text-sm font-semibold tracking-tight'>
            Chiaki DS
          </Link>
          <nav
            aria-label='Main navigation'
            className='hidden items-center gap-6 text-sm text-muted-foreground md:flex'
          >
            <a href='#features' className='transition hover:text-foreground'>
              Features
            </a>
            <a href='#rich-text' className='transition hover:text-foreground'>
              Guide
            </a>
            <a href='#contact' className='transition hover:text-foreground'>
              Contact
            </a>
          </nav>
          <Button size='sm'>Start</Button>
        </Inner>
      </Container>
    </Section>
  );
}
