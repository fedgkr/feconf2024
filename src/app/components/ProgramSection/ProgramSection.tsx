import { FC } from 'react';
import { Column, FadeIn, SectionTitle } from '~/shared/components';
import { styled } from '@styled-system/jsx';
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

const ProgramSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <ProgramContextProvider>
      <Section
        ref={ref}
        animate={entry?.isIntersecting ? 'visible' : 'hidden'}
        variants={container}
      >
        <Column style={{ maxWidth: 946, margin: '0 auto' }}>
          <SectionTitle
            title="Program"
            description="FEConf를 빛낼<br/>스피커와 프로그램을 소개합니다"
          />
          <ProgramTab />
          <ProgramHeader />
          <SessionList />
          <FadeIn distance={30}>
            <DownloadTimetable target="_blank" href={timetable.src}>
              타임 테이블 이미지 다운로드
            </DownloadTimetable>
          </FadeIn>
        </Column>
      </Section>
    </ProgramContextProvider>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    padding: '150px 0',
  },
});

const DownloadTimetable = styled('a', {
  base: {
    marginTop: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    width: '350px',
    height: '64px',
    padding: '20px 60px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '10px',
    color: '#010308',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '130%',
    cursor: 'pointer',
    background: '#fff',
    backdropFilter: 'blur(3.1121041774749756px)',
  },
});

export default ProgramSection;
