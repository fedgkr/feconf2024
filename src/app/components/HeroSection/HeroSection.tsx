import { forwardRef } from 'react';
import { styled } from '@pigment-css/react';
import { DataLocation, HeroLogo } from './components';
import { Column } from '@/shared/components';
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

const line: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hidden: {
    opacity: 0,
    y: '60px',
    transition: { duration: 0.25 },
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
        <Title variants={line}>뜨거운 열정을 가진 당신이 올해의 주인공</Title>
        <LogoWrap variants={line}>
          <HeroLogo />
        </LogoWrap>
        <Info variants={line}>
          <DataLocation />
        </Info>
        <PurchaseButton variants={line}>티켓 구매하기</PurchaseButton>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section)`
  padding: 170px 0 420px 0;
`;

const Title = styled(motion.h3)`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: #ffffff;
  opacity: 0;
  transform: translateY(60px);
`;

const LogoWrap = styled(motion.div)`
  margin-top: 70px;
  opacity: 0;
  transform: translateY(60px);
`;

const Info = styled(motion.div)`
  margin-top: 70px;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
  opacity: 0;
  transform: translateY(60px);
`;

const PurchaseButton = styled(motion.button)`
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
  opacity: 0;
  transform: translateY(60px);
`;

export default HeroSection;
