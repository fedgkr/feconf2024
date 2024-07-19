import { forwardRef } from 'react';
import { styled } from '@pigment-css/react';
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
        <Title y={60} duration={{ in: 0.8 }}>
          뜨거운 열정을 가진 당신이 올해의 주인공
        </Title>
        <LogoWrap y={60} duration={{ in: 0.8 }}>
          <HeroLogo />
        </LogoWrap>
        <Info y={60} duration={{ in: 0.8 }}>
          <DataLocation />
        </Info>
        <PurchaseButton y={60} duration={{ in: 0.8 }}>
          티켓 구매하기
        </PurchaseButton>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section)`
  padding: 170px 0 420px 0;
`;

const Title = styled(FadeIn)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  color: #ffffff;
`;

const LogoWrap = styled(FadeIn)`
  margin-top: 50px;
`;

const Info = styled(FadeIn)`
  margin-top: 78px;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
`;

const PurchaseButton = styled(FadeIn)`
  margin-top: 90px;
  padding: 17px 0;
  border: none;
  border-radius: 10px;
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #010308;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #f5f5f5;
  }
`;

export default HeroSection;
