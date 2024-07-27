'use client';

import { FC, useState } from 'react';
import { styled } from '@styled-system/jsx';
import { map, size } from 'lodash-es';
import { FadeIn } from '~/shared/components';
import { SessionType } from '~/features/programs/types';
import type { Session } from '~/features/programs/types';
import { timeLabelLookup } from '~/features/programs/constants';

import { ClockIcon, SessionModal } from './components';
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
  const length = sessions.length;
  return (
    <Container>
      <Line className={'session-time-line'} />
      <TimeIcon />
      {map(sessions, (session, index) => {
        const { title, speakers, order } = session;
        return (
          <Session
            key={index}
            distance={30}
            onClick={() => handleClickSession(session)}
          >
            <Line
              className={
                index === 0
                  ? 'session-first-line'
                  : index === length - 1
                    ? 'session-last-line'
                    : ''
              }
            />
            <Time>
              <span>{timeLabelLookup[order]}</span>
              <LiveIcon>
                <IconChild />
              </LiveIcon>
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
    position: 'relative',
    marginTop: {
      base: '40px',
      xl: '100px',
    },
    paddingTop: {
      base: '70px',
      xl: '0px',
    },
    width: '100%',
  },
});

const Session = styled(FadeIn, {
  base: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    cursor: 'pointer',
    '&:not(:first-of-type)': {
      marginTop: {
        base: '30px',
        xl: '60px',
      },
    },
  },
});

const Line = styled(FadeIn, {
  base: {
    '--session-margin-top': {
      base: '30px',
      xl: '60px',
    },
    '--session-time-top': {
      base: '0px',
      xl: '58px',
    },
    '--session-time-height': '24px',
    '--session-time-center': 'calc(var(--session-time-height) / 2)',
    position: 'absolute',
    top: {
      base: 'calc(-1 * var(--session-margin-top))',
      xl: 'calc(var(--session-time-top) + var(--session-time-center))',
    },
    height: {
      // 24px 원이 포함된 영역 크기
      // 14px 그 사이 여백
      base: 'calc(var(--session-margin-top) + var(--session-time-height) + 14px)',
      xl: 'calc(100% + var(--session-margin-top))',
    },
    left: {
      base: '15px',
      xl: '135px',
    },
    width: '1px',
    background: 'rgba(255, 255, 255, 10%)',
    '&.session-time-line': {
      top: '35px',
      height:
        'calc(var(--session-margin-top) + var(--session-time-top) + var(--session-time-center) - 35px)',
      display: {
        base: 'none',
        xl: 'block',
      },
    },
    '&.session-first-line': {
      // padding-top 35px
      top: {
        base: 'calc(-1 * var(--session-margin-top) - 35px)',
        xl: 'calc(var(--session-time-top) + var(--session-time-center))',
      },
      height: {
        // 24px 원이 포함된 영역 크기
        // 14px 그 사이 여백
        base: 'calc(var(--session-margin-top) + var(--session-time-height) + 14px + 35px)',
        xl: 'calc(100% + var(--session-margin-top))',
      },
    },
    '&.session-last-line': {
      display: {
        base: 'block',
        xl: 'none',
      },
    },
  },
});
const TimeIcon = styled(ClockIcon, {
  base: {
    position: 'absolute',
    top: '0px',
    left: {
      base: '-2px',
      xl: '118px',
    },
    opacity: '0',
    transform: 'translateY(30px)',
    padding: '9px 8px 8px 9px',
    boxSizing: 'content-box !important',
    borderRadius: '10px',
    backgroundColor: 'rgba(78, 77, 96, 0.2)',
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
    // 100px (시간) + 86px (충분한 오른쪽 여백)
    width: {
      base: 'initial',
      xl: '186px',
    },
    // marginRight: {
    //   base: 'initial',
    //   xl: '84px',
    // },
    paddingLeft: {
      base: '31px',
      xl: 'initial',
    },
  },
});

const LiveIcon = styled('div', {
  base: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    right: {
      base: 'initial',
      // 여백을 줬기 때문에 자체적인 right 값 부여
      xl: '58px',
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
