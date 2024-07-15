'use client';

import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { map } from 'lodash-es';
import { motion, Variants } from 'framer-motion';

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

const SessionList: FC = () => {
  return (
    <Container>
      {map(sessions, ({ title, speaker, time }, index) => (
        <Session key={index} variants={line}>
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

const Container = styled.div`
  margin-top: 100px;
  min-height: 223px;
`;

const Session = styled(motion.div)({
  display: 'flex',
  alignItems: 'flex-start',
  '&:not(:first-child)': {
    marginTop: 60,
  },
});

const Time = styled.div`
  position: relative;
  display: flex;
  flex-grow: 0;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-top: 58px;
  margin-right: 84px;
`;

const TimeIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  right: -27px;
  width: 15px;
  height: 15px;
  font-size: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transform: translate(100%, -50%);
`;

const IconChild = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
`;

const SessionInfo = styled.div`
  flex: 1;
  border-radius: 20px;
  background: rgba(78, 77, 96, 0.2);
`;

const Info = styled.div`
  padding: 30px 180px 45px 40px;
`;

const Title = styled.div`
  color: #fff;
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 53.2px */
`;

const SpeakerInfo = styled.div`
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
`;

export default SessionList;
