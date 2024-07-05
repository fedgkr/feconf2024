'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { noop } from 'lodash-es';

interface AuroraContextType {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

const AuroraContext = createContext<AuroraContextType>({
  visible: false,
  show: noop,
  hide: noop,
});

const AuroraProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  return (
    <AuroraContext.Provider value={{ visible, show, hide }}>
      {children}
    </AuroraContext.Provider>
  );
};

const useAurora = () => useContext(AuroraContext);

export default AuroraContext;
export { useAurora, AuroraProvider };
