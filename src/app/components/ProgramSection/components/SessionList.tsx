'use client';

import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { map } from 'lodash-es';
import { FadeIn } from '~/shared/components';

const sessions = [
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
  {
    title: 'Airbridge SDK팀이 순수한 Unit Testable한 코드를 작성하는 방법',
    speaker: '후원사',
    time: '12:50 - 13:00',
  },
];

const SessionList: FC = () => {
  return (
    <Container>
      {map(sessions, ({ title, speaker, time }, index) => (
        <Session key={index} distance={30}>
          <Time>
            <span>{time}</span>
            <TimeIcon>
              <IconChild />
            </TimeIcon>
          </Time>
          <SessionInfo>
            <Info>
              <Title>{title}</Title>
              <SpeakerInfo>{speaker}</SpeakerInfo>
            </Info>
          </SessionInfo>
        </Session>
      ))}
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
