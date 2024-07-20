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
        <Title duration={{ in: 0.8 }}>
          뜨거운 열정을 가진 당신이 올해의 주인공
        </Title>
        <LogoWrap duration={{ in: 0.8 }}>
          <HeroLogo />
        </LogoWrap>
        <Info duration={{ in: 0.8 }}>
          <DataLocation />
        </Info>
        <PurchaseButton duration={{ in: 0.8 }}>
          티켓 구매하기
        </PurchaseButton>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section, {
  base: {
    padding: '170px 0 420px 0',
  },
});

const Title = styled(FadeIn, {
  base: {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3',
    color: '#ffffff',
  },
});

const LogoWrap = styled(FadeIn, {
  base: {
    marginTop: '50px',
  },
});

const Info = styled(FadeIn, {
  base: {
    marginTop: '78px',
    fontSize: '22px',
    fontWeight: '600',
    lineHeight: '1.4',
    color: '#ffffff',
  },
});

const PurchaseButton = styled(FadeIn, {
  base: {
    marginTop: '90px',
    padding: '17px 0',
    border: 'none',
    borderRadius: '10px',
    width: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#010308',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.3',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
});

export default HeroSection;
