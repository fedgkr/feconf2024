/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AmbientLight,
  Color,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  ShaderMaterial,
  Vector2,
} from 'three';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';

import gradientImage1 from './assets/gradient1.jpg';
import { useThree } from '@react-three/fiber';
import { MeshPhysicalMaterialWithGlow } from './MeshPhysicalMaterialWithGlow';
// import { MeshPosition, useSceneComposer } from '~/shared/contexts';
// import useMeshScale from '~/shared/hooks/useMeshScale';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import Color4 from 'three/examples/jsm/renderers/common/Color4.js';
import { BlurShader } from './external/BlurShader';
import { useHeroScreen } from '~/features/hooks/useHeroScreen';
import { usePrefersReducedMotionRef } from '~/features/hooks/usePrefersReducedMotion';
import { BokehShader } from './external/BokehShader';

const sphereSize = 1;
const sphereSegments = 64;

const glowState = {
  glowIntensity: 3,
  glowPower: 4,
  glowColor: '#5d9be5',
  visible: true,
  rotatable: true,
};

const dofState = {
  focus: 150,
  aperture: 20,
  maxblur: 0.02,
  blurOffset: 3,
  blurCount: 2,
  blurOpacity: 1,
};

function GradientSphere() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const texture = useTexture(gradientImage1.src, texture => {
    texture.repeat.setX(-1);
    texture.repeat.setY(1);
  });

  const lightRef = useRef<AmbientLight>(null);
  const processingRef = useRef<Record<string, any>>({});
  const three = useThree();
  const { gl, scene } = three;
  const camera = three.camera as OrthographicCamera;

  const { sizeRef, scrollRef, screenSizeRef, onScroll, onResize, dispatch } =
    useHeroScreen();

  const render = useCallback(() => {
    if (!meshRef.current?.visible) {
      return;
    }
    processingRef.current?.composer?.render();
  }, []);

  useEffect(() => {
    if (!gl || !scene) {
      processingRef.current = {};
      return;
    }

    const postprocessing = processingRef.current;
    const renderPass = new RenderPass(scene, camera);

    renderPass.clearAlpha = 0;
    renderPass.clearColor = new Color4(0, 1, 1, 0);
    renderPass.clearDepth = true;

    // focus?: number;
    // aspect?: number;
    // aperture?: number;
    // maxblur?: number;
    const bokehPass = new BokehPass(scene, camera, {
      focus: dofState.focus,
      aperture: dofState.aperture * 0.00001,
      maxblur: dofState.maxblur,
    });

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
    const bokehShaderPass = new ShaderPass(
      new ShaderMaterial({
        ...BokehShader,
        uniforms: {
          ...BokehShader.uniforms,
        },
      })
    );
    composer.addPass(blurShaderPass);
    composer.addPass(bokehShaderPass);

    postprocessing.composer = composer;
    postprocessing.bokeh = bokehPass;
    postprocessing.bokehShaderPass = bokehShaderPass;
    postprocessing.blurShaderPass = blurShaderPass;
    postprocessing.renderPass = renderPass;

    return () => {
      processingRef.current = {};
    };
  }, [gl, scene, camera]);

  useEffect(() => {
    if (!processingRef.current.bokeh) {
      return;
    }
    // const bokeh = processingRef.current.bokeh;
    // bokeh.uniforms['focus'].value = dofState.focus;
    // bokeh.uniforms['aperture'].value = dofState.aperture * 0.00001;
    // bokeh.uniforms['maxblur'].value = dofState.maxblur;

    const bokehShaderPass = processingRef.current.bokehShaderPass;

    bokehShaderPass.uniforms['focus'].value = dofState.focus;
    bokehShaderPass.uniforms['aperture'].value = dofState.aperture * 0.00001;
    bokehShaderPass.uniforms['maxblur'].value = dofState.maxblur;

    const blurOffset = dofState.blurOffset;
    const res = gl.getDrawingBufferSize(new Vector2());

    processingRef.current.blurShaderPass.uniforms.uBlurOffset.value =
      blurOffset / res.y;
  }, [gl, Object.values(dofState)]);

  useEffect(() => {
    meshRef.current!.rotation.x = MathUtils.degToRad(-50);

    let id = requestAnimationFrame(function raq() {
      if (!meshRef.current) {
        id = requestAnimationFrame(raq);
        return;
      }

      const targetRad = MathUtils.degToRad(-250);

      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRad,
        0.05
      );

      render();
      if (Math.abs(meshRef.current.rotation.x - targetRad) < 0.05) {
        return;
      }
      id = requestAnimationFrame(raq);
    });

    onResize(() => {
      if (!processingRef.current?.composer) {
        return;
      }

      const innerWidth = sizeRef.current.width;
      const innerHeight = gl.domElement.clientHeight; // sizeRef.current.height;
      const ratio = innerWidth / innerHeight;
      const height = 8;
      const width = height * ratio;

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.near = 1;
      camera.far = 100;
      camera.updateProjectionMatrix();

      gl.setSize(innerWidth, innerHeight);
      processingRef.current?.composer.setSize(innerWidth, innerHeight);

      dispatch('scroll');
    });

    onScroll(() => {
      if (!meshRef.current) {
        return;
      }
      const isReduced = reducedRef.current;
      const firstSectionRect = screenSizeRef.current[0];
      const secondSectionRect = screenSizeRef.current[1];
      const secondSectionScroll = firstSectionRect.height;
      const thirdScaleScroll =
        firstSectionRect.height +
        secondSectionRect.height -
        -sizeRef.current.height;
      const maxScaleScroll =
        secondSectionScroll +
        secondSectionRect.height / 3 -
        sizeRef.current.height / 2;

      const lightRGB = [255, 246, 206];
      const scaleDist = Math.min(1, scrollRef.current / maxScaleScroll);
      const scale = Math.max(1, 1 + scaleDist * 3);
      const emissiveValue = Math.max(0, scale / 2 - 1);

      processingRef.current.bokehShaderPass.enabled = !isReduced;
      lightRGB.forEach((color, i) => {
        lightRGB[i] = Math.min(255, color * scale);
      });

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

      let scrollTop = scrollRef.current!;

      if (!isReduced && scrollTop > maxScaleScroll) {
        scrollTop += (scrollTop - maxScaleScroll) * 1.1;
      }

      const opacity = Math.min(
        1,
        Math.max(0, 1 - (scrollTop - maxScaleScroll - 100) * 0.0004)
      );

      gl.domElement.style.opacity = `${opacity}`;

      const prevVisible = meshRef.current!.visible;
      const nextY = isReduced
        ? 0.3
        : 0.3 - (scrollRef.current / thirdScaleScroll) * 0.1;
      const ss = 1 + (scrollRef.current / thirdScaleScroll) * 0.1;
      const ms = 3.2 * (isReduced ? 1 : ss);

      meshRef.current!.scale.x = ms;
      meshRef.current!.scale.y = ms;
      meshRef.current!.scale.z = ms;
      meshRef.current!.position.y = nextY;
      meshRef.current!.position.z = -3;

      if (opacity) {
        meshRef.current!.visible = true;
      } else {
        meshRef.current!.visible = false;
      }

      if (opacity || prevVisible !== !!opacity) {
        render();
      }
    });

    dispatch('resize');

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);
  const reducedRef = usePrefersReducedMotionRef(() => {
    dispatch('scroll');
  });

  const glowColor = useMemo(() => {
    return new Color(glowState.glowColor);
  }, [glowState.glowColor]);

  return (
    <>
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <ambientLight ref={lightRef} color="#FFF6CE" intensity={3} />
      <mesh ref={meshRef} position={[0, 0, -30]} visible={false} scale={5}>
        <sphereGeometry args={[sphereSize, sphereSegments, sphereSegments]} />
        <MeshPhysicalMaterialWithGlow
          ref={materialRef}
          transparent={true}
          opacity={dofState.blurOpacity}
          glowIntensity={glowState.glowIntensity}
          glowPower={glowState.glowPower}
          glowColor={glowColor}
          map={texture}
          roughness={0.35}
          metalness={0}
          reflectivity={0.2}
        />
      </mesh>
    </>
  );
}

export default GradientSphere;
