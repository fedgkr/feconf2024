/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Mesh, ShaderMaterial, Vector2 } from 'three';
import type { GUI as GUIType } from 'dat.gui';

import auroraImage from '../assets/background4.png';
import { useHeroScreen } from '~/features/hooks/useHeroScreen';
import { usePrefersReducedMotionRef } from '~/features/hooks/usePrefersReducedMotion';

let GUI: typeof GUIType;

if (typeof window !== 'undefined') {
  import('dat.gui')
    .then(module => {
      GUI = module.default.GUI;
    })
    .catch(error => console.error('Failed to load dat.GUI:', error));
}

const vertexShader = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

mat4 rotateZ(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat4(c, -s, 0.0, 0.0,
                s, c, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

  uniform float uTime;
  uniform float uTurbulence;
  uniform float uFrequency;
  uniform float uRotationSpeed;

  varying vec2 vUv;
  varying vec3 vColor;

  void main() {
    vColor = vec3(0.5);

    vUv = uv;

    mat4 rotationMatrix = rotateZ(uRotationSpeed + (uTime * 0.2));
    float noise = snoise(vec3(uv, uTime * uFrequency));

    // vec3 pos = vec3(position.x, position.y, position.z + 0.1 * sin(uv.x * uTurbulence) * sin(uv.y * uTurbulence));
    vec3 pos = vec3(position.x, position.y, position.z + noise * uTurbulence);
    // vec3 pos = vec3(position.x, position.y, position.z);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform sampler2D aoMap;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    gl_FragColor = texture2D(aoMap, uv);
  }
`;

interface Props {}

const Aurora: FC<Props> = () => {
  const meshRef = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);
  const background = useTexture(auroraImage.src);
  const textureRatio = 1; // height / width
  const [guiState, setGuiState] = useState({
    // meshSize: 35,
    meshSize: 42,
    turbulence: 4,
    frequency: 0.4,
    rotationSpeed: 0.55,
    yPosition: 10.5,
    wireframe: false,
  });
  const { gl, scene, camera } = useThree();
  const { scrollRef, screenSizeRef, sizeRef, onScroll, onResize, dispatch } =
    useHeroScreen();

  const startTime = Date.now();
  let id = 0;

  const render = useCallback((once?: boolean) => {
    cancelAnimationFrame(id);
    if (shaderRef.current?.uniforms) {
      shaderRef.current!.uniforms.uTime.value = (Date.now() - startTime) / 1000;
    }
    gl.render(scene, camera);

    if (!once && !reducedRef.current) {
      id = requestAnimationFrame(() => render());
    }
  }, []);

  useEffect(() => {
    const gui = new GUI();
    const handleChange = () => setGuiState({ ...guiState });
    gui.add(guiState, 'wireframe').onChange(handleChange);
    gui.add(guiState, 'meshSize', 5, 100).onChange(handleChange);
    gui.add(guiState, 'frequency', 0, 1).onChange(handleChange);
    gui.add(guiState, 'turbulence', 0, 5).onChange(handleChange);
    gui.add(guiState, 'yPosition', 0, 15, 0.1).onChange(handleChange);
    gui.add(guiState, 'rotationSpeed', 0, 10, 0.1).onChange(handleChange);
    gui.hide();
    return () => {
      gui.destroy();
    };
  }, [setGuiState, guiState]);

  useEffect(() => {
    onResize(() => {
      if (!gl) {
        return;
      }
      const { width, height } = sizeRef.current;
      gl.setSize(width, height);
      camera.position.z = 6;
      (camera as any).aspect = width / height;
      camera.updateProjectionMatrix();
      dispatch('scroll');
    });
    onScroll(() => {
      if (!gl) {
        return;
      }
      const firstSectionRect = screenSizeRef.current[0];
      const secondSectionRect = screenSizeRef.current[1];
      const maxScaleScroll =
        firstSectionRect.height +
        secondSectionRect.height * 0.66 -
        sizeRef.current.height / 2;
      const prevVisible = meshRef.current!.visible;

      const opacity = Math.min(
        Math.max(0, scrollRef.current - maxScaleScroll) * 0.002,
        1
      );

      gl.domElement.style.opacity = `${opacity}`;
      meshRef.current!.visible = opacity > 0;

      if (opacity || prevVisible !== !!opacity) {
        render(!opacity);
      }
    });

    dispatch('resize');
  }, [gl, camera]);
  const reducedRef = usePrefersReducedMotionRef(() => {
    render(meshRef.current!.visible);
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={[0, guiState.yPosition, 0]}
        scale={0.5}
        visible={false}
      >
        <planeGeometry
          args={[guiState.meshSize, guiState.meshSize * textureRatio, 30, 30]}
        />
        <shaderMaterial
          ref={shaderRef}
          args={[
            {
              opacity: 1,
              transparent: true,
              wireframe: guiState.wireframe,
              uniforms: {
                uTime: { value: 0 },
                uFrequency: { value: guiState.frequency },
                uTurbulence: { value: guiState.turbulence },
                uRotationSpeed: { value: guiState.rotationSpeed },
                u_resolution: {
                  value: new Vector2(
                    innerWidth * devicePixelRatio,
                    innerHeight * devicePixelRatio
                  ),
                },
                aoMap: { value: background },
              },
              vertexShader,
              fragmentShader,
            },
          ]}
        />
      </mesh>
    </>
  );
};

export default Aurora;
