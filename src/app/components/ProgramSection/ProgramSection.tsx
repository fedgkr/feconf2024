import { FC } from 'react';
import { Column, FadeIn, SectionTitle } from '~/shared/components';
import { styled } from '@styled-system/jsx';
import { ProgramTab, ProgramHeader, SessionList } from './components';
import { ProgramContextProvider } from '~/features/programs/contexts';
import { motion, Variants } from 'framer-motion';

import timetable from './assets/timetable.jpg';
import { useInView } from 'react-intersection-observer';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const ProgramSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <ProgramContextProvider>
      <Section
        ref={ref}
        animate={inView ? 'visible' : 'hidden'}
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
          <ButtonWrap distance={30}>
            <DownloadTimetable target="_blank" href={timetable.src}>
              타임 테이블 이미지 다운로드
            </DownloadTimetable>
          </ButtonWrap>
        </Column>
      </Section>
    </ProgramContextProvider>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    padding: {
      base: '60px 20px',
      xl: '150px 0',
    },
  },
});

const DownloadTimetable = styled('a', {
  base: {
    marginTop: {
      base: '40px',
      xl: '150px',
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    maxWidth: {
      base: 'initial',
      xl: '350px',
    },
    width: '100%',
    height: {
      base: '54px',
      xl: '64px',
    },
    padding: '20px 60px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '10px',
    color: '#010308',
    fontSize: {
      base: '16px',
      xl: '20px',
    },
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '130%',
    cursor: 'pointer',
    background: '#fff',
    backdropFilter: 'blur(3.1121041774749756px)',
  },
});

const ButtonWrap = styled(FadeIn, {
  base: {
    width: '100%',
  },
});

export default ProgramSection;
