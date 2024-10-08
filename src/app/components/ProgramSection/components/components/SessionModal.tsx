import { FC, Fragment } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@styled-system/jsx';
import { Session, SessionType } from '~/features/programs/types';
import {
  lightningSessionTimeLabelLookup,
  sessionTimeLabelLookup,
} from '~/features/programs/constants';

import CloseIcon from './CloseIcon';
import { map, size } from 'lodash-es';

interface Props {
  session: Session | null;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
}

const labelLookup: Record<SessionType, string> = {
  [SessionType.A]: 'Speaker A',
  [SessionType.B]: 'Speaker B',
  [SessionType.Lightning]: 'Lightning Talk',
};

const SessionModal: FC<Props> = ({ session, open, onChangeOpen }) => {
  const timeLabelLookup =
    session?.type === SessionType.Lightning
      ? lightningSessionTimeLabelLookup
      : sessionTimeLabelLookup;
  return (
    <Dialog.Root open={open} onOpenChange={onChangeOpen}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Header>
            {session && (
              <Time>
                <span>{labelLookup[session.type]}</span>
                <span>{timeLabelLookup[session.order]}</span>
              </Time>
            )}
            <Dialog.Close asChild>
              <CloseButton />
            </Dialog.Close>
          </Header>
          {session && (
            <>
              <Title>{session.title}</Title>
              <Description
                dangerouslySetInnerHTML={{ __html: session.description || '' }}
              />
              <Speaker>
                {map(session?.speakers, (speaker, index) => (
                  <Fragment key={index}>
                    <span>
                      {speaker?.name}
                      {index < size(session?.speakers) - 1 ? ', ' : ''}
                    </span>
                    {speaker?.company && <span> | {speaker?.company}</span>}
                  </Fragment>
                ))}
              </Speaker>
            </>
          )}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Overlay = styled(Dialog.Overlay, {
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const Content = styled(Dialog.Content, {
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 40px)',
    maxWidth: 595,
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    padding: {
      base: '20px',
      xl: '30px 40px 40px 40px',
    },
    backgroundColor: '#1A1B23',
    zIndex: 2,
  },
});

const Header = styled('header', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Time = styled('div', {
  base: {
    padding: '10px 12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid rgba(168, 172, 192, 0.10)',
    borderRadius: 8,
    color: '#A8ACC0',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 500,
  },
});

const Title = styled(Dialog.Title, {
  base: {
    color: '#FFF',
    fontSize: {
      base: '18px',
      xl: '32px',
    },
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '140%',
    marginTop: {
      base: '20px',
      xl: '24px',
    },
  },
});

const Description = styled('p', {
  base: {
    color: '#FFF',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '160%',
    marginTop: {
      base: '12px',
      xl: '14px',
    },
  },
});

const Speaker = styled('div', {
  base: {
    color: '#A8ACC0',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: {
      base: '20px',
      xl: '30px',
    },
  },
});

const CloseButton = styled(CloseIcon, {
  base: {
    cursor: 'pointer',
  },
});

export default SessionModal;
