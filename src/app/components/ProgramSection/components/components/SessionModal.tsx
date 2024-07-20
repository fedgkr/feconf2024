import { FC } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@styled-system/jsx';
import { Session } from '~/features/programs/types';
import { timeLabelLookup } from '~/features/programs/constants';

import CloseIcon from './CloseIcon';
import { first } from 'lodash-es';

interface Props {
  session: Session | null;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
}

const SessionModal: FC<Props> = ({ session, open, onChangeOpen }) => {
  const speaker = first(session?.speakers);
  return (
    <Dialog.Root open={open} onOpenChange={onChangeOpen}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Header>
            {session && (
              <Time>
                <span>Speaker A</span>
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
              <Description>{session.description}</Description>
              <Speaker>
                <span>{speaker?.name}</span>
                {speaker?.company && <span> | {speaker?.company}</span>}
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
    width: 595,
    borderRadius: 20,
    padding: '30px 40px 40px 40px',
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
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '140%',
    marginTop: '24px',
  },
});

const Description = styled('p', {
  base: {
    color: '#FFF',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '160%',
    marginTop: '14px',
  },
});

const Speaker = styled('div', {
  base: {
    color: '#A8ACC0',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: '30px',
  },
});

const CloseButton = styled(CloseIcon, {
  base: {
    cursor: 'pointer',
  },
});

export default SessionModal;
