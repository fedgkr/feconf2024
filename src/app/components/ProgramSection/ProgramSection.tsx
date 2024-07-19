import { FC } from 'react';
import { Column, SectionTitle } from '~/shared/components';
import { styled } from '@pigment-css/react';
import { ProgramTab, ProgramHeader, SessionList } from './components';
import { ProgramContextProvider } from '~/features/programs/contexts';
import { motion, Variants } from 'framer-motion';
import { useIntersection } from '@mantine/hooks';

import timetable from './assets/timetable.jpg';

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

const ProgramSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <ProgramContextProvider>
      <Section
        ref={ref}
        animate={entry?.isIntersecting ? 'visible' : 'hidden'}
        variants={container}
      >
        <Column sx={{ maxWidth: 946, margin: '0 auto' }}>
          <SectionTitle
            title="Program"
            description="FEConf를 빛낼<br/>스피커와 프로그램을 소개합니다"
          />
          <ProgramTab />
          <ProgramHeader />
          <SessionList />
          <DownloadTimetable
            target="_blank"
            href={timetable.src}
            variants={line}
          >
            타임 테이블 이미지 다운로드
          </DownloadTimetable>
        </Column>
      </Section>
    </ProgramContextProvider>
  );
};

const Section = styled(motion.section)`
  position: relative;
  padding: 150px 0;
`;

const DownloadTimetable = styled(motion.a)`
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 350px;
  height: 64px;
  padding: 20px 60px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  color: rgba(1, 3, 8, 1);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  cursor: pointer;
  background: #fff;
  backdrop-filter: blur(3.1121041774749756px);
`;

export default ProgramSection;
