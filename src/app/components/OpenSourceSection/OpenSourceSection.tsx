import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, SectionTitle } from '~/shared/components';

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
        <Wrap distance={0} duration={{ in: 0.2 }}>
          <FadeIn distance={30}>
            <Image src={openSources.src} />
          </FadeIn>
          <FadeIn distance={30}>
            <Description>
              당연하게만 사용해온 프론트엔드 오픈소스 프로젝트에 감사의 의미를
              담아 FEConf에서 후원을 진행합니다. 컨퍼런스 현장에서 경험할 수
              있는 오픈소스 이벤트까지 놓치지 마세요!
            </Description>
          </FadeIn>
        </Wrap>
      </Column>
    </Section>
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

const Wrap = styled(FadeIn, {
  base: {
    display: 'flex',
    width: '100%',
    maxWidth: '920px',
    marginTop: {
      base: '50px',
      xl: '130px',
    },
    padding: {
      base: '20px 16px 30px 16px',
      xl: '40px 25px 60px 25px',
    },
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: {
      base: '20px',
      xl: '40px',
    },
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    background: 'rgba(78, 77, 96, 0.2)',
    boxShadow: '20px 20px 200px 0px rgba(1, 3, 8, 0.07)',
  },
});

const Image = styled('img', {
  base: {
    width: {
      base: '228px',
      xl: '612px',
    },
    height: {
      base: '63px',
      xl: '169px',
    },
  },
});

const Description = styled('p', {
  base: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: {
      base: '14px',
      xl: '18px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160%',
  },
});

export default OpenSourceSection;
