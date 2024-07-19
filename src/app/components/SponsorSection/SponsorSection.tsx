'use client';

import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { Column, SectionTitle } from '~/shared/components';

import { SponsorInfo } from './comopnents';
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

const SponsorSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <Section
      ref={ref}
      animate={entry?.isIntersecting ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <SectionTitle
          title="Sponsors"
          description="프론트엔드 개발 생태계를 밝혀주는 2024 FEconf 후원사를 소개합니다"
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

const Section = styled(motion.section)`
  position: relative;
  padding: 150px 0;
`;

const SponsorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 100px;
`;

export default SponsorSection;
