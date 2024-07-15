'use client';

import { FC, PropsWithChildren } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { styled } from '@pigment-css/react';
import { useAurora } from '@/features/aurora/contexts';
import { Aurora } from '@/features/aurora/components';
import SphereEffect from './SphereEffect';
import { motion } from 'framer-motion';

interface Props {}

const EffectWrap: FC<PropsWithChildren<Props>> = () => {
  const { visible } = useAurora();
  return (
    <Container>
      <FiberCanvas
        style={{
          position: 'absolute',
          transition: 'opacity 1200ms ease-out',
        }}
      >
        {visible ? <Aurora /> : <SphereEffect />}
      </FiberCanvas>
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
