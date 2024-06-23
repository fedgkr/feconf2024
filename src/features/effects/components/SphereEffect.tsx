import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { styled } from '@pigment-css/react';

const SphereEffect: FC = () => {
  return (
    <Container>
      <Canvas>
        <perspectiveCamera position={[0, 0, 10]} />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default SphereEffect;
