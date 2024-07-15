'use client';

import { FC } from 'react';
import { ProgramType } from '@/features/programs/types';
import { styled } from '@pigment-css/react';
import { useProgram } from '@/features/programs/contexts';
import { motion, Variants } from 'framer-motion';

const labelLookup: Record<ProgramType, string> = {
  [ProgramType.A]: 'Speaker A',
  [ProgramType.B]: 'Speaker B',
  [ProgramType.Sponsor]: 'Sponsor',
  [ProgramType.Lightning]: 'Lightning Talk',
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

const ProgramHeader: FC = () => {
  const { currentTab } = useProgram();
  return (
    <Container>
      <Title variants={line}>{labelLookup[currentTab]}</Title>
      <Description variants={line}>
        2024년, 국내 최정상 프론트 엔지니어들의 가장 뜨거웠던 현장 경험을
        공유합니다
      </Description>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  margin-top: 50px;
  padding: 45px 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(33, 35, 50, 0.2);
`;

const Title = styled(motion.h2)`
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  line-height: 1.3;
  text-align: center;
`;

const Description = styled(motion.p)`
  margin-top: 13px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
`;

export default ProgramHeader;
