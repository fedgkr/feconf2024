'use client';

import { FC, PropsWithChildren } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { styled } from '@styled-system/jsx';
import { GradientSphere } from './SphereEffect/components';
import Aurora from '~/features/aurora/components/Aurora';

interface Props {}

const EffectWrap: FC<PropsWithChildren<Props>> = () => {
  return (
    <Container>
      <FiberCanvas
        frameloop="never"
        style={{
          position: 'absolute',
          // transition: 'opacity 1200ms ease-out',
        }}
      >
        <Aurora />
      </FiberCanvas>
      <FiberCanvas
        frameloop="never"
        orthographic
        style={{
          position: 'absolute',
          // transition: 'opacity 1200ms ease-out',
        }}
      >
        <GradientSphere />
      </FiberCanvas>
    </Container>
  );
};

const Container = styled('div', {
  base: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: '-1',
  },
});

export default EffectWrap;
