import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { Column, SectionTitle } from '@/shared/components';

import openSources from './assets/opensources.png';
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

const OpenSourceSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <Section
      ref={ref}
      animate={entry?.isIntersecting ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <SectionTitle
          title="Open Source"
          description="프론트엔드 개발 생태계를 위해<br/>오픈소스를 후원합니다"
        />
        <Wrap variants={line}>
          <Image src={openSources.src} variants={line} />
          <Description variants={line}>
            당연하게만 사용해온 프론트엔드 오픈소스 프로젝트에 감사의 의미를
            담아 FEConf에서 후원을 진행합니다. 컨퍼런스 현장에서 경험할 수 있는
            오픈소스 이벤트까지 놓치지 마세요!
          </Description>
        </Wrap>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section)`
  position: relative;
  padding: 150px 0;
`;

const Wrap = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 920px;
  margin-top: 130px;
  padding: 40px 25px 60px 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border-radius: 20px;
  background: rgba(78, 77, 96, 0.2);
  box-shadow: 20px 20px 200px 0px rgba(1, 3, 8, 0.07);
`;

const Image = styled(motion.img)`
  width: 612px;
  height: 169px;
`;

const Description = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
`;

export default OpenSourceSection;
