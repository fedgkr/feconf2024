'use client'; // This is a client component 👈🏽

import { FC, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { MathUtils, OrthographicCamera } from 'three';
import { GradientSphere } from './components';

interface Props {}

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
    <>
      <Camera />
      <GradientSphere />
    </>
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
