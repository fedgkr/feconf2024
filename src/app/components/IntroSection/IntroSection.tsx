import { forwardRef } from 'react';
import { styled } from '@pigment-css/react';
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
    transition: { duration: 0.6 },
  },
  hidden: {
    opacity: 0,
    y: '30px',
    transition: { duration: 0.25 },
  },
};

const IntroSection = forwardRef<HTMLElement, Props>(({ active }, ref) => {
  return (
    <Section
      ref={ref}
      animate={active ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <Title variants={line}>
          <Highlight>프론트 엔지니어</Highlight>들에 의한,
        </Title>
        <Title variants={line}>
          <Highlight>프론트 엔지니어</Highlight>들에 위한
        </Title>
        <Title variants={line}>
          국내 최대 프론트엔드 컨퍼런스 <Highlight>FEConf</Highlight>
        </Title>
        <Description variants={line}>
          더 나은 프론트 엔지니어링을 위해 노력하는 이들이 함께 모여 현장에서
          겪는 다양한 문제를 함께 공유하고 성장합니다.
        </Description>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section)`
  padding: 180px 0 300px 0;
`;

const Title = styled(motion.h1)`
  font-size: 54px;
  font-weight: 700;
  line-height: 2;
  color: rgba(1, 3, 8, 0.5);
`;

const Description = styled(motion.p)`
  width: 492px;
  margin-top: 80px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  color: rgba(1, 3, 8, 0.8);
  text-align: center;
`;

const Highlight = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
  color: black;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 20px;
    content: '';
    //background-color: #fff;
    z-index: -1;
    transform: translate(-20px, -20px);
  }
`;

export default IntroSection;
