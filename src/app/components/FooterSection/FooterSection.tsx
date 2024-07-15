import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { Column } from '@/shared/components';
import {
  DataLocation,
  HeroLogo,
} from '@/app/components/HeroSection/components';
import { motion, Variants } from 'framer-motion';
import { useIntersection } from '@mantine/hooks';

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
    y: '30px',
    transition: { duration: 0.25 },
  },
};

const FooterSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <Section
      ref={ref}
      animate={entry?.isIntersecting ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <Title variants={line}>8월 24일 토요일, FEConf와 함께해요</Title>
        <LogoWrap variants={line}>
          <HeroLogo />
        </LogoWrap>
        <InfoWrap variants={line}>
          <DataLocation />
        </InfoWrap>
        <PurchaseButton variants={line}>티켓 구매하기</PurchaseButton>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section)`
  position: relative;
  margin-top: 150px;
  margin-bottom: 450px;
`;

const Title = styled(motion.h3)`
  color: #fff;
  text-align: center;
  font-size: 34px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 47.6px */
`;

const LogoWrap = styled(motion.div)`
  margin-top: 50px;
`;

const InfoWrap = styled(motion.div)`
  margin-top: 60px;
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
`;

export default FooterSection;
