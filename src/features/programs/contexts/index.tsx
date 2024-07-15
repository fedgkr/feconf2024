'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { ProgramType } from '@/features/programs/types';
import { noop } from 'lodash-es';

interface ProgramContextType {
  currentTab: ProgramType;
  onChangeTab: (tab: ProgramType) => void;
}

const ProgramContext = createContext<ProgramContextType>({
  currentTab: ProgramType.A,
  onChangeTab: noop,
});

const ProgramContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(ProgramType.A);
  return (
    <ProgramContext.Provider value={{ currentTab, onChangeTab: setCurrentTab }}>
      {children}
    </ProgramContext.Provider>
  );
};

const useProgram = () => useContext(ProgramContext);

export { ProgramContextProvider, useProgram };
