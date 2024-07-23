'use client';

import { FC, useState } from 'react';
import { styled } from '@styled-system/jsx';
import { first, map, size } from 'lodash-es';
import { FadeIn } from '~/shared/components';
import { SessionType } from '~/features/programs/types';
import type { Session } from '~/features/programs/types';
import { timeLabelLookup } from '~/features/programs/constants';

import { SessionModal } from './components';
import { useProgram } from '~/features/programs/contexts';
import {
  aSessionList,
  bSessionList,
  lightningSessionList,
} from '~/features/programs/data/sessions';

const sessionsLookup: Record<SessionType, Session[]> = {
  [SessionType.A]: aSessionList,
  [SessionType.B]: bSessionList,
  [SessionType.Lightning]: lightningSessionList,
};

const SessionList: FC = () => {
  const { currentTab } = useProgram();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const sessions = sessionsLookup[currentTab];
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
                <SpeakerInfo>
                  {map(speakers, (speaker, index) => (
                    <span key={index}>
                      {speaker?.name}
                      {index < size(speakers) - 1 ? ', ' : ''}
                    </span>
                  ))}
                </SpeakerInfo>
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
