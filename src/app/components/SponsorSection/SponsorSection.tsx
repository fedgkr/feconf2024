'use client';

import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, SectionTitle } from '~/shared/components';

import { SponsorInfo } from './comopnents';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const SponsorSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <Section
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <SectionTitle
          title="Sponsors"
          description="프론트엔드 개발 생태계를 밝혀주는<br/>2024 FEconf 후원사를 소개합니다"
        />
        <SponsorList>
          <SponsorInfo grade="Master" />
          <SponsorInfo grade="Diamond" />
          <SponsorInfo grade="Platiunum" />
        </SponsorList>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    padding: {
      base: '120px 0 60px 0',
      xl: '150px 0',
    },
  },
});

const SponsorList = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: {
      base: '100%',
      xl: 'initial',
    },
    padding: {
      base: '20px',
    },
    gap: {
      base: '20px',
      xl: '50px',
    },
    marginTop: {
      base: '50px',
      xl: '100px',
    },
  },
});

export default SponsorSection;
