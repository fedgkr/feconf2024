import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn } from '~/shared/components';
import {
  DataLocation,
  HeroLogo,
} from '~/app/components/HeroSection/components';
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

const FooterSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <Section
      ref={ref}
      animate={entry?.isIntersecting ? 'visible' : 'hidden'}
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
        <FadeIn distance={30}>
          <PurchaseButton>티켓 구매하기</PurchaseButton>
        </FadeIn>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    marginTop: '150px',
    marginBottom: '160px',
  },
});

const Title = styled('h3', {
  base: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '34px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

const LogoWrap = styled('div', {
  base: {
    marginTop: '50px',
  },
});

const InfoWrap = styled('div', {
  base: {
    marginTop: '60px',
  },
});

const PurchaseButton = styled('button', {
  base: {
    marginTop: '90px',
    padding: '17px 0',
    border: 'none',
    borderRadius: '10px',
    width: '240px',
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

export default FooterSection;
