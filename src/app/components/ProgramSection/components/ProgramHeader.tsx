'use client';

import { FC } from 'react';
import { ProgramType } from '@/features/programs/types';
import { styled } from '@pigment-css/react';
import { useProgram } from '@/features/programs/contexts';
import { motion, Variants } from 'framer-motion';
import { ArrowIcon } from './components';
import { find, findIndex, get, indexOf, lt, size } from 'lodash-es';

type HeaderInfo = {
  title: string;
  description: string;
  icon?: string;
};

const programList = [ProgramType.A, ProgramType.B, ProgramType.Lightning];

const headerLookup: Record<ProgramType, HeaderInfo> = {
  [ProgramType.A]: {
    title: 'Speaker',
    description:
      '2024년, 국내 최정상 프론트 엔지니어들의 가장 뜨거웠던 현장 경험을 공유합니다',
    icon: 'A',
  },
  [ProgramType.B]: {
    title: 'Speaker',
    description:
      '2024년, 국내 최정상 프론트 엔지니어들의 가장 뜨거웠던 현장 경험을 공유합니다',
    icon: 'B',
  },
  [ProgramType.Lightning]: {
    title: 'Lightning Talk',
    description:
      '짧지만 강렬하게 프론트엔드 개발에 대한 진솔한 이야기를 나누며 함께 공감하고 토론하세요',
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

const ProgramHeader: FC = () => {
  const { currentTab, onChangeTab } = useProgram();
  const { title, description, icon } = headerLookup[currentTab];
  const index = indexOf(programList, currentTab);
  const hasPrev = index !== 0;
  const hasNext = lt(index, size(programList) - 1);
  const handleClickPrev = () => {
    const target = get(programList, index - 1);
    onChangeTab(target);
  };
  const handleClickNext = () => {
    const target = get(programList, index + 1);
    onChangeTab(target);
  };
  return (
    <Container>
      <Title variants={line}>
        <span>{title}</span>
        {icon && <Icon>{icon}</Icon>}
      </Title>
      <Description variants={line}>{description}</Description>
      {hasPrev && (
        <NavWrap
          style={{ left: 30, transform: 'rotate(180deg)' }}
          onClick={handleClickPrev}
        >
          <ArrowIcon />
        </NavWrap>
      )}
      {hasNext && (
        <NavWrap style={{ right: 30 }} onClick={handleClickNext}>
          <ArrowIcon />
        </NavWrap>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-top: 50px;
  padding: 45px 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(33, 35, 50, 0.2);
`;

const Title = styled(motion.h2)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  line-height: 1.3;
  text-align: center;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 400;
  background-color: rgba(78, 77, 96, 0.3);
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

const NavWrap = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
`;

export default ProgramHeader;
