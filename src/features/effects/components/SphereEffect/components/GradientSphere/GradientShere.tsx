/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AmbientLight,
  Color,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  ShaderMaterial,
  Vector2,
} from 'three';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';

import gradientImage1 from './assets/gradient1.jpg';
import { useThree } from '@react-three/fiber';
import { MeshPhysicalMaterialWithGlow } from './MeshPhysicalMaterialWithGlow';
// import { MeshPosition, useSceneComposer } from '~/shared/contexts';
// import useMeshScale from '~/shared/hooks/useMeshScale';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/Addons.js';
import Color4 from 'three/examples/jsm/renderers/common/Color4.js';
import { BokehPass2 } from './external/BokehPass2.js';
import { BlurShader } from './external/BlurShader';
import { useHeroScreen } from '@/features/hooks/useHeroScreen';
import { usePrefersReducedMotionRef } from '@/features/hooks/usePrefersReducedMotion';

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
  maxblur: 0.03,
  blurOffset: 3,
  blurCount: 2,
  blurOpacity: 1,
};

const GradientSphere = forwardRef(() => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const texture = useTexture(gradientImage1.src, texture => {
    texture.repeat.setX(-1);
    texture.repeat.setY(1);
  });

  const lightRef = useRef<AmbientLight>(null);
  const processingRef = useRef<Record<string, any>>({});
  const { gl, scene, camera } = useThree();

  const { sizeRef, scrollRef, screenSizeRef, onScroll, onResize, dispatch } =
    useHeroScreen();

  const render = useCallback(() => {
    processingRef.current?.composer?.render();
  }, []);

  useEffect(() => {
    if (!gl || !scene || !camera) {
      processingRef.current = {};
      return;
    }

    const postprocessing = processingRef.current;
    const renderPass = new RenderPass(scene, camera);

    renderPass.clearAlpha = 0;
    renderPass.clearColor = new Color4(0, 1, 1, 0);
    renderPass.clearDepth = true;

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

    return () => {
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

  useEffect(() => {
    meshRef.current!.rotation.x = MathUtils.degToRad(-50);

    let id = requestAnimationFrame(function raq() {
      if (!meshRef.current) {
        id = requestAnimationFrame(raq);
        return;
      }

      const targetRad = MathUtils.degToRad(-200 - scrollRef.current / 50);

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
      processingRef.current?.composer.setSize(
        sizeRef.current.width,
        sizeRef.current.height
      );
      dispatch('scroll');
    });

    onScroll(() => {
      if (!meshRef.current) {
        return;
      }
      const isReduced = reducedRef.current;
      const firstSectionRect = screenSizeRef.current[0];
      const secondSectionRect = screenSizeRef.current[1];
      const maxScaleScroll =
        firstSectionRect.height +
        secondSectionRect.height / 3 -
        sizeRef.current.height / 2;

      const lightRGB = [255, 246, 206];
      const scaleDist = Math.min(1, scrollRef.current / maxScaleScroll) * 3;
      const scale = Math.max(1, 1 + scaleDist);

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

      if (opacity) {
        meshRef.current!.visible = true;
      } else {
        meshRef.current!.visible = false;
      }

      const nextY = Math.min(20, -7 + scrollTop / 150);
      const ms = 5 * (isReduced ? 1.3 : Math.min(1.3, 1 + (scale - 1) / 12));

      meshRef.current!.scale.x = ms;
      meshRef.current!.scale.y = ms;
      meshRef.current!.scale.z = ms;

      meshRef.current!.position.y = nextY;

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
      <mesh ref={meshRef} position={[0, 0, -60]} visible={false} scale={5}>
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
});

export default GradientSphere;
