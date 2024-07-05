'use client';

import { FC } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { styled } from '@pigment-css/react';
import Aurora from './Aurora';
import { useAurora } from '@/features/aurora/contexts';

const AuroraWrap: FC = () => {
  const { visible } = useAurora();
  return (
    <Container>
      <Frame>
        <Canvas style={{ opacity: visible ? 1 : 0 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Aurora />
        </Canvas>
      </Frame>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: -1;
`;

const Frame = styled.div`
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  z-index: -1;
`;

const Canvas = styled(FiberCanvas)`
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  transition: opacity 1200ms ease-out;
`;

export default AuroraWrap;
