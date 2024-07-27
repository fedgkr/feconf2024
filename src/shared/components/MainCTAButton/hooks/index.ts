import { match } from 'ts-pattern';
import { EVENT_END_TIMESTAMP, TICKET_OPEN_TIMESTAMP } from '~/shared/constants';
import { useEffect, useState } from 'react';

type Status = 'presale' | 'sale' | 'soldout' | 'postevent';

const getStatus = (): Status =>
  match(Date.now())
    .when(
      now => now < TICKET_OPEN_TIMESTAMP,
      () => 'presale' as const
    )
    .when(
      now => now > EVENT_END_TIMESTAMP,
      () => 'postevent' as const
    )
    .otherwise(() => 'sale' as const);

const useEventStatus = () => {
  const [status, setStatus] = useState<Status>(getStatus());
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus());
    }, 1000);
    return () => clearInterval(interval);
  }, [setStatus]);
  return status;
};

export { useEventStatus };
