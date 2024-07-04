/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AmbientLight,
  Color,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  RepeatWrapping,
  ShaderMaterial,
  Texture,
  Vector2,
} from 'three';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';

import gradientImage1 from './assets/gradient1.jpg';
import gradientImage2 from './assets/gradient2.jpg';
import gradientImage3 from './assets/gradient3.jpg';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshPhysicalMaterialWithGlow } from './MeshPhysicalMaterialWithGlow';
// import { MeshPosition, useSceneComposer } from '~/shared/contexts';
// import useMeshScale from '~/shared/hooks/useMeshScale';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/Addons.js';
import Color4 from 'three/examples/jsm/renderers/common/Color4.js';
import { BokehPass2 } from './external/BokehPass2';
import { BlurShader } from './external/BlurShader';

const sphereSize = 1;
const sphereSegments = 64;
const degMap: Record<number, number> = {
  0: -250,
  1: 70,
  2: 120,
  3: 230,
  4: 290,
  5: 430,
};

const GradientSphere = forwardRef(() => {
  const sceneIndex = 0;
  // const { sceneIndex, position } = useSceneComposer();
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const [rotation] = useState(1);
  const texture1 = useTexture(gradientImage1.src, texture => {
    texture.repeat.setX(-1);
    texture.repeat.setY(1);
  });

  const texture2 = useTexture(gradientImage2.src, texture => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.setX(-1);
    texture.repeat.setY(1);
  });
  const texture3 = useTexture(gradientImage3.src, texture => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.setX(-1);
    texture.repeat.setY(1);
  });
  const textureMap: Record<number, Texture> = {
    0: texture1,
    1: texture1,
    2: texture1,
    3: texture2,
    4: texture3,
    5: texture1,
  };

  const glowState = {
    glowIntensity: 3,
    glowPower: 4,
    glowColor: '#5d9be5',
    visible: true,
    rotatable: true,
  };
  //   ,
  //   {
  //     glowIntensity: [0, 20, 1],
  //     glowPower: [0, 20, 1],
  //     glowColor: 'color',
  //   }
  // );

  const dofState = {
    focus: 150,
    aperture: 20,
    maxblur: 0.03,
    blurOffset: 3,
    blurCount: 2,
    blurOpacity: 1,
  };
  // );
  const scrollRef = useRef<number>(0);
  const processingRef = useRef<Record<string, any>>({});
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (!gl || !scene || !camera) {
      processingRef.current = {};
      return;
    }
    // gl.autoClear = false;

    const postprocessing = processingRef.current;

    const renderPass = new RenderPass(scene, camera);

    renderPass.clearAlpha = 0;
    renderPass.clearColor = new Color4(0, 1, 1, 0);
    renderPass.clearDepth = true;

    // const blurCount = dofState.blurCount;
    // const blurOffset = dofState.blurOffset;
    // const blurOpacity = dofState.blurOpacity;
    // const horizontalBlurPass = new ShaderPass(HorizontalBlurShader);
    // const blurPass = new InternalBlurPass(gl);
    // const kawaseBlurPass = new KawaseBlurPass({
    //   renderer: gl,
    //   blurOffset,
    //   blurCount,
    //   opacity: blurOpacity,
    // });

    // blurPass.setBlurs(blurOffset, blurCount);
    // kawaseBlurPass.setBlurs(blurOffset, blurCount);

    const bokehPass = new BokehPass2(scene, camera, {
      focus: dofState.focus,
      aperture: dofState.aperture * 0.00001,
      maxblur: dofState.maxblur,
    });

    // const outputPass = new OutputPass();
    const composer = new EffectComposer(gl);
    composer.addPass(renderPass);

    const blurShaderPass = new ShaderPass(
      new ShaderMaterial({
        ...BlurShader,
        uniforms: {
          ...BlurShader.uniforms,
        },
      })
    );
    composer.addPass(blurShaderPass);

    // composer.addPass(kawaseBlurPass);
    // composer.addPass(outputPass);
    composer.addPass(bokehPass);
    // composer.addPass(outputPass);
    // composer.addPass(outputPass);

    const mixPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: composer.renderTarget2.texture },
        },
        vertexShader: `varying vec2 vUv;
          void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

          }`,
        fragmentShader: `

          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;

          varying vec2 vUv;

          void main() {

            // gl_FragColor = texture2D(baseTexture, vUv); + texture2D(bloomTexture, vUv);
            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
          }`,
        defines: {},
      }),
      'baseTexture'
    );
    mixPass.needsSwap = true;

    const finalComposer = new EffectComposer(gl);
    finalComposer.addPass(renderPass);
    finalComposer.addPass(mixPass);

    postprocessing.composer = composer;
    postprocessing.finalComposer = finalComposer;
    postprocessing.bokeh = bokehPass;
    postprocessing.blurShaderPass = blurShaderPass;
    // postprocessing.kawaseBlurPass = kawaseBlurPass;
    // postprocessing.blurPass = blurPass;

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      composer.setSize(width, height);
      // finalComposer.setSize(width, height);
    }

    function onScroll() {
      const scrollTop = document.documentElement.scrollTop;

      scrollRef.current = scrollTop;
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);

    onScroll();
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      processingRef.current = {};
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    if (!processingRef.current.bokeh) {
      return;
    }
    const bokeh = processingRef.current.bokeh;
    bokeh.uniforms['focus'].value = dofState.focus;
    bokeh.uniforms['aperture'].value = dofState.aperture * 0.00001;
    bokeh.uniforms['maxblur'].value = dofState.maxblur;
    // const blurCount = dofState.blurCount;
    const blurOffset = dofState.blurOffset;

    const res = gl.getDrawingBufferSize(new Vector2());

    processingRef.current.blurShaderPass.uniforms.uBlurOffset.value =
      blurOffset / res.y;
  }, [gl, Object.values(dofState)]);

  const lightRef = useRef<AmbientLight>(null);

  // useEffect(() => {
  //   lightRef.current?.layers.set(0);
  //   meshRef.current?.layers.set(0);
  // }, []);

  useEffect(() => {
    meshRef.current!.rotation.x = MathUtils.degToRad(-150);
    // meshRef.current!.rotation.y = MathUtils.degToRad(-150);
  }, []);

  useFrame(() => {
    // gl.autoClear = false;

    const orthoCamera = camera as OrthographicCamera;
    if (!meshRef.current || !orthoCamera.right) return;


    const lightRGB = [255, 246, 206];
    const scale = Math.max(1, 1 + scrollRef.current / 300);
    lightRGB.forEach((color, i) => {
      lightRGB[i] = Math.min(255, color * scale);
    });

    const emissiveValue = Math.max(0, scale / 2 - 1);
    materialRef.current!.emissive = new Color(
      emissiveValue,
      emissiveValue,
      emissiveValue
    );
    lightRef.current!.color = new Color(
      lightRGB[0] / 255,
      lightRGB[1] / 255,
      lightRGB[2] / 255
    );

    const targetRad = MathUtils.degToRad(
      degMap[sceneIndex] - scrollRef.current / 50
    );

    meshRef.current!.position.y = MathUtils.lerp(
      meshRef.current!.position.y,
      Math.min(10, -6 + scrollRef.current! / 200),
      0.05
    );
    meshRef.current.rotation.x = MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRad,
      0.05
    );

    // camera.layers.set(0);
    processingRef.current?.composer?.render();
  }, 1);

  // useMeshScale(meshRef);

  const glowColor = useMemo(() => {
    return new Color(glowState.glowColor);
  }, [glowState.glowColor]);

  return (
    <>
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <ambientLight ref={lightRef} color="#FFF6CE" intensity={3} />
      <mesh
        ref={meshRef}
        position={[0, -6, 0]}
        visible={glowState.visible}
        scale={5}
      >
        <sphereGeometry args={[sphereSize, sphereSegments, sphereSegments]} />
        <MeshPhysicalMaterialWithGlow
          ref={materialRef}
          transparent={true}
          opacity={dofState.blurOpacity}
          glowIntensity={glowState.glowIntensity}
          glowPower={glowState.glowPower}
          glowColor={glowColor}
          map={textureMap[sceneIndex]}
          roughness={0.35}
          metalness={0}
          reflectivity={0.2}
        />
      </mesh>
    </>
  );
});

export default GradientSphere;
