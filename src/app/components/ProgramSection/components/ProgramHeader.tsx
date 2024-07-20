'use client';

import { FC } from 'react';
import { ProgramType } from '~/features/programs/types';
import { styled } from '@styled-system/jsx';
import { useProgram } from '~/features/programs/contexts';
import { motion, Variants } from 'framer-motion';
import { ArrowIcon } from './components';
import { get, indexOf, lt, size } from 'lodash-es';
import { FadeIn } from '~/shared/components';

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
      <FadeIn distance={30}>
        <Title>
          <span>{title}</span>
          {icon && <Icon>{icon}</Icon>}
        </Title>
      </FadeIn>
      <FadeIn distance={30}>
        <Description>{description}</Description>
      </FadeIn>
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

const Container = styled(FadeIn, {
  base: {
    position: 'relative',
    width: '100%',
    marginTop: '50px',
    padding: '45px 0',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(33, 35, 50, 0.2)',
  },
});

const Title = styled('h2', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
    fontWeight: '500',
    color: '#fff',
    lineHeight: '1.3',
    textAlign: 'center',
  },
});

const Icon = styled('div', {
  base: {
    width: '35px',
    height: '35px',
    marginLeft: '20px',
    borderRadius: '10px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: '400',
    backgroundColor: 'rgba(78, 77, 96, 0.3)',
  },
});

const Description = styled('p', {
  base: {
    marginTop: '13px',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160%',
  },
});

const NavWrap = styled('button', {
  base: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto 0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    cursor: 'pointer',
  },
});

export default ProgramHeader;
