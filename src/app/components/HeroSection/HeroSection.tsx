import { forwardRef } from 'react';
import { styled } from '@styled-system/jsx';
import { DataLocation, HeroLogo } from './components';
import { Column, FadeIn, MainCTAButton } from '~/shared/components';
import { motion, Variants } from 'framer-motion';

interface Props {
  active?: boolean;
}

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const HeroSection = forwardRef<HTMLElement, Props>(({ active }, ref) => {
  return (
    <Section
      ref={ref}
      animate={active ? 'visible' : 'hidden'}
      variants={container}
    >
      <Container>
        <Title distance={60} duration={{ in: 0.8 }}>
          뜨거운 열정을 가진 당신이 올해의 주인공
        </Title>
        <LogoWrap distance={60} duration={{ in: 0.8 }}>
          <HeroLogo />
        </LogoWrap>
        <Info distance={60} duration={{ in: 0.8 }}>
          <DataLocation />
        </Info>
        <ButtonWrap distance={60} duration={{ in: 0.8 }}>
          <MainCTAButton size="m" status="presale" />
        </ButtonWrap>
      </Container>
    </Section>
  );
});

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    height: '100vh',
    minHeight: '800px',
  },
});

const Container = styled(Column, {
  base: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    padding: '0 20px',
    transform: 'translateY(-50%) translateY(-40px)',
  },
});

const Title = styled(FadeIn, {
  base: {
    fontSize: {
      base: '18px',
      xl: '24px',
    },
    fontWeight: '600',
    lineHeight: '1.3',
    color: '#ffffff',
  },
});

const LogoWrap = styled(FadeIn, {
  base: {
    marginTop: {
      base: '30px',
      xl: '50px',
    },
    '& svg': {
      width: {
        base: '300px',
        xl: 'initial',
      },
      height: {
        base: '64px',
        xl: 'initial',
      },
    },
  },
});

const Info = styled(FadeIn, {
  base: {
    marginTop: {
      base: '40px',
      xl: '78px',
    },
  },
});

const ButtonWrap = styled(FadeIn, {
  base: {
    width: '100%',
    textAlign: 'center',
    marginTop: {
      base: '50px',
      xl: '90px',
    },
  },
});

export default HeroSection;
