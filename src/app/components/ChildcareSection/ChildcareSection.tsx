import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, SectionTitle } from '~/shared/components';

import jaranda from './assets/jaranda.png';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const ChildcareSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <Section
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column style={{ maxWidth: 946, margin: '0 auto' }}>
        <SectionTitle
          title="Childcare Service"
          description="2024 FEConf는<br/>아이 돌봄 서비스와 함께합니다"
        />
        <Info distance={0} duration={{ in: 0.2 }}>
          <FadeIn distance={30}>
            <Image src={jaranda.src} />
          </FadeIn>
          <FadeIn distance={30}>
            <Description>
              2024 FEConf는 자녀 동반 참가자를 위한 현장 아이돌봄 케어 서비스를
              제공합니다.
              <br />
              육아 케어 전문 기업 자란다와 함께 안전하고 보람찬 아이돌봄
              서비스를 운영합니다.
            </Description>
          </FadeIn>
        </Info>
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

const Info = styled(FadeIn, {
  base: {
    marginTop: {
      base: '50px',
      xl: '100px',
    },
    display: 'flex',
    width: '100%',
    maxWidth: '920px',
    padding: {
      base: '20px 25px 30px 25px',
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
      base: '188px',
      xl: '357px',
    },
    height: {
      base: '59px',
      xl: '113px',
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
    lineHeight: '160%' /* 28.8px */,
  },
});

const PurchaseButton = styled('a', {
  base: {
    marginTop: {
      base: '40px',
      xl: '80px',
    },
    padding: {
      base: '20px 0',
      xl: '17px 0',
    },
    border: 'none',
    borderRadius: '10px',
    width: {
      base: '100%',
      xl: '240px',
    },
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#010308',
    fontSize: {
      base: '16px',
      xl: '20px',
    },
    fontWeight: '700',
    lineHeight: '1.3',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
});

const ButtonWrap = styled(FadeIn, {
  base: {
    width: '100%',
    textAlign: 'center',
  },
});

export default ChildcareSection;
