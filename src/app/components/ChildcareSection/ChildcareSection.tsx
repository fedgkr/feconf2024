import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, SectionTitle } from '~/shared/components';

import jaranda from './assets/jaranda.png';
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

const line: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hidden: {
    opacity: 0,
    y: '30px',
    transition: { duration: 0.25 },
  },
};

const ChildcareSection: FC = () => {
  const { ref, entry } = useIntersection();
  return (
    <Section
      ref={ref}
      animate={entry?.isIntersecting ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <SectionTitle
          title="Childcare Service"
          description="2024 FEConf는<br/>아이 돌봄 서비스와 함께합니다"
        />
        <Info>
          <Image variants={line} src={jaranda.src} />
          <Description variants={line}>
            아이 돌봄 서비스는 컨퍼런스 참여자들의 행사 집중도 향상을 위한 현장
            자녀 케어 서비스입니다.
            <br />
            안전하고 보람찬 아이 돌봄 서비스를 제공하기 위해 2024 FEConf 아이
            돌봄 서비스는 자란다와 함께 운영됩니다.
          </Description>
        </Info>
        <PurchaseButton variants={line}>아이 돌봄 티켓 구매하기</PurchaseButton>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    padding: '150px 0',
  },
})

const Info = styled('div', {
  base: {
    marginTop: '100px',
    display: 'flex',
    width: '100%',
    maxWidth: '920px',
    padding: '40px 25px 60px 25px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    borderRadius: '20px',
    background: 'rgba(78, 77, 96, 0.2)',
    boxShadow: '20px 20px 200px 0px rgba(1, 3, 8, 0.07)',
  },
});

const Image = styled(motion.img, {
  base: {
    width: '357px',
    height: '113px',
  },
});

const Description = styled(motion.p, {
  base: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160%', /* 28.8px */
  },
});

const PurchaseButton = styled(motion.button, {
  base: {
    marginTop: '80px',
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

export default ChildcareSection;
