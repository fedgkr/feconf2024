import { FC } from 'react';
import { Canvas } from '@react-three/fiber';

const AuroraEffect: FC = () => {
  return (
    <Canvas>
      <perspectiveCamera position={[0, 0, 10]} />
    </Canvas>
  );
};

export default AuroraEffect;
