import { FC, PropsWithChildren } from 'react';
import { styled } from '@styled-system/jsx';
import { match, P } from 'ts-pattern';
import { TICKET_LINK, YOUTUBE_LINK } from '~/shared/constants';

import { useEventStatus } from './hooks';

interface Props {
  size: 's' | 'm';
}

const MainCTAButton: FC<PropsWithChildren<Props>> = ({ size }) => {
  const status = useEventStatus();
  const label = match(status)
    .with('presale', () => '7월 31 구매 오픈')
    .with('sale', () => '티켓 구매하기')
    .with('soldout', () => 'Sold Out')
    .with('postevent', () => '세션 보러가기')
    .exhaustive();
  const href = match(status)
    .with(P.union('presale', 'sale'), () => TICKET_LINK)
    .with('soldout', () => undefined)
    .with('postevent', () => YOUTUBE_LINK)
    .exhaustive();
  return (
    <Button target="_blank" href={href} size={size} status={status}>
      {label}
      {size === 'm' && status === 'soldout' && (
        <SubLabel>티켓이 매진되었습니다</SubLabel>
      )}
    </Button>
  );
};

const Button = styled('a', {
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    fontWeight: '700',
    cursor: 'pointer',
    '&:not([href])': {
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      s: {
        width: '118px',
        height: '40px',
        fontSize: '14px',
        borderRadius: '6px',
      },
      m: {
        fontSize: {
          base: '16px',
          xl: '20px',
        },
        borderRadius: '10px',
        maxWidth: '300px',
        width: {
          base: '100%',
          xl: '240px',
        },
        height: {
          base: '53px',
          xl: '61px',
        },
      },
    },
    status: {
      presale: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
      sale: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
      },
      soldout: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
      postevent: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
      },
    },
  },
});

const SubLabel = styled('span', {
  base: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default MainCTAButton;
