'use client';

import { FC } from 'react';
import { ProgramType } from '@/features/programs/types';
import { styled } from '@pigment-css/react';
import { eq, map } from 'lodash-es';
import { useProgram } from '@/features/programs/contexts';
import { motion, Variants } from 'framer-motion';

interface Props {}

const tabList = [
  ProgramType.A,
  ProgramType.B,
  ProgramType.Sponsor,
  ProgramType.Lightning,
];

const labelLookup: Record<ProgramType, string> = {
  [ProgramType.A]: 'Speaker A',
  [ProgramType.B]: 'Speaker B',
  [ProgramType.Sponsor]: 'Sponsor',
  [ProgramType.Lightning]: 'Lightning Talk',
};

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

const ProgramTab: FC<Props> = () => {
  const { currentTab, onChangeTab } = useProgram();
  return (
    <List variants={line}>
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
  );
};

const List = styled(motion.ul)`
  margin-top: 100px;
  padding: 10px;
  border-radius: 12px;
  background-color: rgba(78, 77, 96, 0.2);
`;

const Tab = styled('li')<{ active: boolean }>({
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
  variants: [
    {
      props: { active: true },
      style: { backgroundColor: 'rgba(78, 77, 96, 0.50);' },
    },
    {
      props: { active: false },
      style: { backgroundColor: 'transparent' },
    },
  ],
});

const Button = styled.button`
  cursor: pointer;
`;

export default ProgramTab;
