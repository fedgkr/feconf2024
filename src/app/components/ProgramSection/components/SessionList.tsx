'use client';

import { FC, useState } from 'react';
import { styled } from '@styled-system/jsx';
import { first, map } from 'lodash-es';
import { FadeIn } from '~/shared/components';
import { SessionType } from '~/features/programs/types';
import type { Session } from '~/features/programs/types';
import { timeLabelLookup } from '~/features/programs/constants';

import { SessionModal } from './components';

const sessions: Session[] = [
  {
    type: SessionType.A,
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    description:
      '2023년의 프론트엔드 개발은 사실상 React로 천하 통일되었습니다. 그런데, 우리는 정말 각자의 문제를 푸는 데에 React가 필요해서, 혹은 React가 가장 적절한 도구라서 사용하고 있을까요? 프론트엔드 애플리케이션을 구성하기 위한 다양한 선택지들을 살펴보고, React 안팎의 프론트엔드 생태계를 둘러보면서, 각자의 문제를 푸는 데에 가장 적절한 도구를 찾아가 보는 시간을 가져보려 합니다.',
    speakers: [
      {
        name: '후원사',
      },
    ],
    order: 1,
  },
  {
    type: SessionType.A,
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    description:
      '2023년의 프론트엔드 개발은 사실상 React로 천하 통일되었습니다. 그런데, 우리는 정말 각자의 문제를 푸는 데에 React가 필요해서, 혹은 React가 가장 적절한 도구라서 사용하고 있을까요? 프론트엔드 애플리케이션을 구성하기 위한 다양한 선택지들을 살펴보고, React 안팎의 프론트엔드 생태계를 둘러보면서, 각자의 문제를 푸는 데에 가장 적절한 도구를 찾아가 보는 시간을 가져보려 합니다.',
    speakers: [
      {
        name: '후원사',
      },
    ],
    order: 2,
  },
  {
    type: SessionType.A,
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    description:
      '2023년의 프론트엔드 개발은 사실상 React로 천하 통일되었습니다. 그런데, 우리는 정말 각자의 문제를 푸는 데에 React가 필요해서, 혹은 React가 가장 적절한 도구라서 사용하고 있을까요? 프론트엔드 애플리케이션을 구성하기 위한 다양한 선택지들을 살펴보고, React 안팎의 프론트엔드 생태계를 둘러보면서, 각자의 문제를 푸는 데에 가장 적절한 도구를 찾아가 보는 시간을 가져보려 합니다.',
    speakers: [
      {
        name: '후원사',
      },
    ],
    order: 3,
  },
  {
    type: SessionType.A,
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    description:
      '2023년의 프론트엔드 개발은 사실상 React로 천하 통일되었습니다. 그런데, 우리는 정말 각자의 문제를 푸는 데에 React가 필요해서, 혹은 React가 가장 적절한 도구라서 사용하고 있을까요? 프론트엔드 애플리케이션을 구성하기 위한 다양한 선택지들을 살펴보고, React 안팎의 프론트엔드 생태계를 둘러보면서, 각자의 문제를 푸는 데에 가장 적절한 도구를 찾아가 보는 시간을 가져보려 합니다.',
    speakers: [
      {
        name: '후원사',
      },
    ],
    order: 4,
  },
  {
    type: SessionType.A,
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    description:
      '2023년의 프론트엔드 개발은 사실상 React로 천하 통일되었습니다. 그런데, 우리는 정말 각자의 문제를 푸는 데에 React가 필요해서, 혹은 React가 가장 적절한 도구라서 사용하고 있을까요? 프론트엔드 애플리케이션을 구성하기 위한 다양한 선택지들을 살펴보고, React 안팎의 프론트엔드 생태계를 둘러보면서, 각자의 문제를 푸는 데에 가장 적절한 도구를 찾아가 보는 시간을 가져보려 합니다.',
    speakers: [
      {
        name: '후원사',
      },
    ],
    order: 5,
  },
];

const SessionList: FC = () => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const handleClickSession = (session: Session) => {
    setCurrentSession(session);
    setOpen(true);
  };
  const handleChangeOpen = (open: boolean) => {
    if (!open) setOpen(open);
  };
  return (
    <Container>
      {map(sessions, (session, index) => {
        const { title, speakers, order } = session;
        return (
          <Session
            key={index}
            distance={30}
            onClick={() => handleClickSession(session)}
          >
            <Time>
              <span>{timeLabelLookup[order]}</span>
              <TimeIcon>
                <IconChild />
              </TimeIcon>
            </Time>
            <SessionInfo>
              <Info>
                <Title>{title}</Title>
                <SpeakerInfo>{first(speakers)?.name}</SpeakerInfo>
              </Info>
            </SessionInfo>
          </Session>
        );
      })}
      <SessionModal
        session={currentSession}
        open={open}
        onChangeOpen={handleChangeOpen}
      />
    </Container>
  );
};

const Container = styled('div', {
  base: {
    marginTop: '100px',
    minHeight: '223px',
  },
});

const Session = styled(FadeIn, {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    '&:not(:first-child)': {
      marginTop: '60px',
    },
  },
});

const Time = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    flexGrow: 0,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: '58px',
    marginRight: '84px',
  },
});

const TimeIcon = styled('div', {
  base: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: '-27px',
    width: '15px',
    height: '15px',
    fontSize: 0,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.35)',
    transform: 'translate(100%, -50%)',
  },
});

const IconChild = styled('div', {
  base: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.8)',
  },
});

const SessionInfo = styled('div', {
  base: {
    flex: 1,
    borderRadius: '20px',
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Info = styled('div', {
  base: {
    padding: '30px 180px 45px 40px',
  },
});

const Title = styled('div', {
  base: {
    color: '#fff',
    fontSize: '28px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%' /* 53.2px */,
  },
});

const SpeakerInfo = styled('div', {
  base: {
    marginTop: '24px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '100%' /* 18px */,
  },
});

export default SessionList;
