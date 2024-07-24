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
          <SponsorInfo grade="Rookie" />
          <MediaSponsor>
            <Line />
            <Title>
              Media Partner <strong>요즘 IT</strong>
            </Title>
            <Line />
          </MediaSponsor>
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
      xl: '920px',
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

const MediaSponsor = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: {
      base: '12px',
      xl: '24px',
    },
    marginTop: {
      base: '20px',
      xl: '50px',
    },
    height: {
      base: '25px',
      xl: '25px',
    },
  },
});

const Line = styled('div', {
  base: {
    flex: '1',
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const Title = styled('span', {
  base: {
    fontSize: {
      base: '14px',
      xl: '18px',
    },
    color: 'rgba(255, 255, 255, 0.3)',
    '& > strong': {
      fontSize: {
        base: '14px',
        xl: '18px',
      },
      fontWeight: 500,
      color: '#a4a4a4',
      marginLeft: {
        base: '8px',
        xl: '24px',
      },
    },
  },
});

export default SponsorSection;
