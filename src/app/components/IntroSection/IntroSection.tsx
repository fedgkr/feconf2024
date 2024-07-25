import { forwardRef } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn } from '~/shared/components';
import { motion, Variants } from 'framer-motion';

interface Props {
  active?: boolean;
}

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
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
        <FadeIn>
          <Title>
            <Highlight>프론트 엔지니어</Highlight>들에 의한,
          </Title>
        </FadeIn>
        <FadeIn>
          <Title>
            <Highlight>프론트 엔지니어</Highlight>들에 위한
          </Title>
        </FadeIn>
        <FadeIn>
          <Title>
            국내 최고 컨퍼런스 <Highlight>FEConf</Highlight>
          </Title>
        </FadeIn>
        <FadeIn>
          <Description>
            더 나은 프론트 엔지니어링을 위해 노력하는 이들이 함께 모여 현장에서
            겪는 다양한 문제를 함께 공유하고 성장합니다.
          </Description>
        </FadeIn>
      </Column>
    </Section>
  );
});

const Section = styled(motion.section, {
  base: {
    padding: {
      base: '200px 0 300px 0',
      xl: '180px 0 300px 0',
    },
  },
});

const Title = styled('h1', {
  base: {
    fontSize: {
      base: '26px',
      xl: '54px',
    },
    fontWeight: '700',
    lineHeight: '2',
    color: 'rgba(1, 3, 8, 0.5)',
  },
});

const Description = styled('p', {
  base: {
    width: {
      base: '313px',
      xl: '492px',
    },
    marginTop: {
      base: '60px',
      xl: '50px',
    },
    fontSize: {
      base: '16px',
      xl: '20px',
    },
    fontWeight: '600',
    lineHeight: '1.6',
    color: 'rgba(1, 3, 8, 0.8)',
    textAlign: 'center',
  },
});

const Highlight = styled('span', {
  base: {
    position: 'relative',
    display: 'inline-block',
    lineHeight: '1',
    color: 'black',
  },
});

export default IntroSection;
