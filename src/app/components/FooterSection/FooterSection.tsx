import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, MainCTAButton } from '~/shared/components';
import {
  DataLocation,
  HeroLogo,
} from '~/app/components/HeroSection/components';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TICKET_LINK } from '~/shared/constants';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const FooterSection: FC = () => {
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
        <FadeIn distance={30}>
          <Title>8월 24일 토요일, FEConf와 함께해요</Title>
        </FadeIn>
        <FadeIn distance={30}>
          <LogoWrap>
            <HeroLogo />
          </LogoWrap>
        </FadeIn>
        <FadeIn distance={30}>
          <InfoWrap>
            <DataLocation />
          </InfoWrap>
        </FadeIn>
        <ButtonWrap distance={30}>
          <MainCTAButton size="m" status="presale" />
        </ButtonWrap>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    marginTop: {
      base: '60px',
      xl: '150px',
    },
    marginBottom: '160px',
    padding: {
      base: '0 20px',
    },
  },
});

const Title = styled('h3', {
  base: {
    color: '#fff',
    textAlign: 'center',
    fontSize: {
      base: '18px',
      xl: '34px',
    },
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

const LogoWrap = styled('div', {
  base: {
    marginTop: {
      base: '30px',
      xl: '50px',
    },
    '& > svg': {
      width: {
        base: '300px',
        xl: 'initial',
      },
      height: {
        base: '64px',
        xl: 'initial',
      },
    },
  },
});

const InfoWrap = styled('div', {
  base: {
    marginTop: {
      base: '40px',
      xl: '60px',
    },
  },
});

const ButtonWrap = styled(FadeIn, {
  base: {
    width: '100%',
    textAlign: 'center',
    marginTop: {
      base: '40px',
      xl: '90px',
    },
  },
});

export default FooterSection;
