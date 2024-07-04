'use client'; // This is a client component 👈🏽

import { FC, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { MathUtils, OrthographicCamera } from 'three';
import { GradientSphere } from './components';

// import noiseImage from './assets/img_noise.png';
import { styled } from '@pigment-css/react';

const Main = styled.main`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #16171a;
`;

const Noise = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 1200ms ease-out,
    background-color 550ms ease-out;
`;

interface Props { }

function Cube({
  color = "white",
  thickness = 2,
  roughness = 0.65,
  envMapIntensity = 1,
  transmission = 0,
  metalness = 0,
  ...props
}) {
  const material = {
    color,
    thickness,
    roughness,
    envMapIntensity,
    transmission,
    metalness
  };

  return (
    <mesh {...props}>
      <boxGeometry />
      <meshPhysicalMaterial {...material} />
    </mesh>
  );
}


const Camera: FC = () => {
  const { set, camera, gl, scene } = useThree();
  const cameraRef = useRef<OrthographicCamera>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current) return;
      const { innerWidth, innerHeight } = window;
      const ratio = innerWidth / innerHeight;
      const height = 8;
      const width = height * ratio;
      cameraRef.current.left = width / -2;
      cameraRef.current.right = width / 2;
      cameraRef.current.top = height / 2;
      cameraRef.current.bottom = height / -2;
      cameraRef.current.near = 1;
      cameraRef.current.far = 100;
      cameraRef.current?.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    set({ camera: cameraRef.current! });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      let y = (-(event.clientY - rect.top) / rect.height) * 2 + 1;

      x *= 0.03;
      y *= 0.03;

      camera.position.x = MathUtils.lerp(camera.position.x, x, 0.1);
      camera.position.y = MathUtils.lerp(camera.position.y, y, 0.1);
      camera.lookAt(scene.position);
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, camera]);
  return <orthographicCamera ref={cameraRef} position={[0, 0, 10]} />;
};

const SphereEffect: FC<Props> = () => {
  // const { opacity } = useSceneComposer();
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const image = new Image();
  //   image.src = noiseImage.src;
  //   image.complete && setLoaded(true);
  //   image.onload = () => setLoaded(true);
  // }, []);
  return (
    <Main>
      {/* <Noise
        style={{
          opacity: loaded ? 0.4 : 0,
          backgroundImage: `url(${noiseImage})`,
          backgroundColor: `rgba(0, 0, 0, ${opacity === 0 ? 0.8 : 0})`,
        }}
      /> */}
      <Container>
        <Canvas
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Camera />
          <GradientSphere />
        </Canvas>
      </Container>
    </Main>
  );
};

// const BackgroundColor: FC = () => {
//   const { scene } = useThree();
//   useEffect(() => {
//     scene.background = new Color('#16171A');
//   }, [scene]);
//   return null;
// };

export default SphereEffect;
