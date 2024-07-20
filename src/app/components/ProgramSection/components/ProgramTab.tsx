'use client';

import { FC } from 'react';
import { SessionType } from '~/features/programs/types';
import { styled } from '@styled-system/jsx';
import { eq, map } from 'lodash-es';
import { useProgram } from '~/features/programs/contexts';
import { FadeIn } from '~/shared/components';

interface Props {}

const tabList = [SessionType.A, SessionType.B, SessionType.Lightning];

const labelLookup: Record<SessionType, string> = {
  [SessionType.A]: 'Speaker A',
  [SessionType.B]: 'Speaker B',
  [SessionType.Lightning]: 'Lightning Talk',
};

const ProgramTab: FC<Props> = () => {
  const { currentTab, onChangeTab } = useProgram();
  return (
    <FadeIn distance={30}>
      <List>
        {map(tabList, tab => (
          <Tab
            key={tab}
            active={eq(tab, currentTab)}
            onClick={() => onChangeTab(tab)}
          >
            <Button>{labelLookup[tab]}</Button>
          </Tab>
        ))}
      </List>
    </FadeIn>
  );
};

const List = styled('ul', {
  base: {
    marginTop: '100px',
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: 'rgba(78, 77, 96, 0.2)',
  },
});

const Tab = styled('li', {
  base: {
    display: 'inline-block',
    padding: '6px 14px',
    margin: '0 20px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '140%',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'background-color 200ms ease-out',
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'rgba(78, 77, 96, 0.50)',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});

const Button = styled('button', {
  base: {
    cursor: 'pointer',
  },
});

export default ProgramTab;
