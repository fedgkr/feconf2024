import { forwardRef } from 'react';
import { styled } from '@styled-system/jsx';
import { DataLocation, HeroLogo } from './components';
import { Column, FadeIn } from '~/shared/components';
import { motion, Variants } from 'framer-motion';

interface Props {
  active?: boolean;
}

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
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
      <Column>
        <Title distance={60} duration={{ in: 0.8 }}>
          뜨거운 열정을 가진 당신이 올해의 주인공
        </Title>
        <LogoWrap distance={60} duration={{ in: 0.8 }}>
          <HeroLogo />
        </LogoWrap>
        <Info distance={60} duration={{ in: 0.8 }}>
          <DataLocation />
        </Info>
        <FadeIn distance={60} duration={{ in: 0.8 }}>
          <PurchaseButton>티켓 구매하기</PurchaseButton>
        </FadeIn>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section, {
  base: {
    padding: {
      base: '144px 0 60px 0',
      xl: '170px 0 420px 0',
    },
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

const PurchaseButton = styled('a', {
  base: {
    marginTop: {
      base: '50px',
      xl: '90px',
    },
    padding: {
      base: '16px 0',
      xl: '17px 0',
    },
    border: 'none',
    borderRadius: '10px',
    width: {
      base: '300px',
      xl: '240px',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#010308',
    fontSize: {
      base: '16px',
      xl: '20px',
    },
    fontWeight: '700',
    lineHeight: '1.3',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
});

export default HeroSection;
