import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn } from '~/shared/components';
import {
  DataLocation,
  HeroLogo,
} from '~/app/components/HeroSection/components';
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
          <PurchaseButton>티켓 구매하기</PurchaseButton>
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

const PurchaseButton = styled('button', {
  base: {
    marginTop: {
      base: '40px',
      xl: '90px',
    },
    padding: '17px 0',
    border: 'none',
    borderRadius: '10px',
    width: {
      base: '100%',
      xl: '240px',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#010308',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.3',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
});

const ButtonWrap = styled(FadeIn, {
  base: {
    width: '100%',
  },
});

export default FooterSection;
