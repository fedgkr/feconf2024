'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { SessionType } from '~/features/programs/types';
import { noop } from 'lodash-es';

interface ProgramContextType {
  currentTab: SessionType;
  onChangeTab: (tab: SessionType) => void;
}

const ProgramContext = createContext<ProgramContextType>({
  currentTab: SessionType.A,
  onChangeTab: noop,
});

const ProgramContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(SessionType.A);
  return (
    <ProgramContext.Provider value={{ currentTab, onChangeTab: setCurrentTab }}>
      {children}
    </ProgramContext.Provider>
  );
};

const useProgram = () => useContext(ProgramContext);

export { ProgramContextProvider, useProgram };
