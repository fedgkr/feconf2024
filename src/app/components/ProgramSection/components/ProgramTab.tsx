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
    display: 'flex',
    marginTop: {
      base: '50px',
      xl: '100px',
    },
    padding: {
      base: '8px',
      xl: '10px',
    },
    borderRadius: {
      base: '10px',
      xl: '12px',
    },
    gap: {
      base: '10px',
      xl: '10px',
    },
    backgroundColor: 'rgba(78, 77, 96, 0.2)',
  },
});

const Tab = styled('li', {
  base: {
    display: 'inline-block',
    padding: {
      base: '4px 8px',
      xl: '6px 14px',
    },
    cursor: 'pointer',
    color: '#fff',
    fontSize: {
      base: '12px',
      xl: '18px',
    },
    fontWeight: 500,
    lineHeight: '140%',
    borderRadius: {
      base: '5px',
      xl: '8px',
    },
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
