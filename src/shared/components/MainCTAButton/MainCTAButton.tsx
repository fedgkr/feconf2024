import { FC, PropsWithChildren } from 'react';
import { styled } from '@styled-system/jsx';
import { match, P } from 'ts-pattern';
import { TICKET_LINK, YOUTUBE_LINK } from '~/shared/constants';

import { useEventStatus } from './hooks';
import { Button } from '~/shared/components';

interface Props {
  size: 's' | 'm';
}

const MainCTAButton: FC<PropsWithChildren<Props>> = ({ size }) => {
  const eventStatus = useEventStatus();
  const label = match(eventStatus)
    .with('presale', () => '7월 31 구매 오픈')
    .with('sale', () => '티켓 구매하기')
    .with('soldout', () => 'Sold Out')
    .with('postevent', () => '세션 보러가기')
    .exhaustive();
  const href = match(eventStatus)
    .with(P.union('presale', 'sale'), () => TICKET_LINK)
    .with('soldout', () => undefined)
    .with('postevent', () => YOUTUBE_LINK)
    .exhaustive();
  const status = match(eventStatus)
    .with(P.union('presale', 'soldout'), () => 'inactive' as const)
    .otherwise(() => 'active' as const);
  return (
    <Button target="_blank" href={href} size={size} status={status}>
      {label}
      {size === 'm' && eventStatus === 'soldout' && (
        <SubLabel>티켓이 매진되었습니다</SubLabel>
      )}
    </Button>
  );
};

const SubLabel = styled('span', {
  base: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default MainCTAButton;
