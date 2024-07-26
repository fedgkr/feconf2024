'use client';

import { FC, PropsWithChildren } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { styled } from '@styled-system/jsx';
import { GradientSphere } from './SphereEffect/components';

interface Props { }

export const SphereContainer: FC<PropsWithChildren<Props>> = () => {
  return (
    <Container className="sphere-container">
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
    position: 'absolute',
    top: '-400px',
    left: '0',
    width: '100vw',
    height: 'calc(100% + 800px)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: '-1',
  },
});
