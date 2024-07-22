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
    marginTop: {
      base: '40px',
      xl: '100px',
    },
    width: '100%',
  },
});

const Session = styled(FadeIn, {
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    cursor: 'pointer',
    '&:not(:first-child)': {
      marginTop: {
        base: '30px',
        xl: '60px',
      },
    },
  },
});

const Time = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    flexGrow: 0,
    flexDirection: {
      base: 'row-reverse',
      xl: 'row',
    },
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: {
      base: 'initial',
      xl: '58px',
    },
    marginRight: {
      base: 'initial',
      xl: '84px',
    },
    paddingLeft: {
      base: '31px',
      xl: 'initial',
    },
  },
});

const TimeIcon = styled('div', {
  base: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: {
      base: 'initial',
      xl: '-27px',
    },
    left: {
      base: '8px',
      xl: 'initial',
    },
    width: '15px',
    height: '15px',
    fontSize: 0,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.35)',
    transform: {
      base: 'translate(0, -50%)',
      xl: 'translate(100%, -50%)',
    },
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
    width: '100%',
    flex: 1,
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    marginTop: {
      base: '14px',
      xl: 'initial',
    },
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Info = styled('div', {
  base: {
    padding: {
      base: '16px',
      xl: '30px 180px 45px 40px',
    },
  },
});

const Title = styled('div', {
  base: {
    color: '#fff',
    fontSize: {
      base: '16px',
      xl: '28px',
    },
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

const SpeakerInfo = styled('div', {
  base: {
    marginTop: {
      base: '10px',
      xl: '24px',
    },
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: {
      base: '12px',
      xl: '18px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '100%',
  },
});

export default SessionList;
