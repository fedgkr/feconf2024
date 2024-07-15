'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { styled } from '@pigment-css/react';
import { useAurora } from '@/features/aurora/contexts';
import { Aurora } from '@/features/aurora/components';
import SphereEffect from './SphereEffect';

interface Props {}

const EffectWrap: FC<PropsWithChildren<Props>> = () => {
  const { visible } = useAurora();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Container>
      {mounted && (
        <FiberCanvas
          style={{
            position: 'absolute',
            transition: 'opacity 1200ms ease-out',
          }}
        >
          {visible ? <Aurora /> : <SphereEffect />}
        </FiberCanvas>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: -1;
`;

export default EffectWrap;
