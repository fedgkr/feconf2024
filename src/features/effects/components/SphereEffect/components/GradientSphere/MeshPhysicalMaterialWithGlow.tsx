// https://github.com/leoncvlt/three-extended-material
/* eslint-disable */
import { Color, MeshPhysicalMaterial, Vector2 } from 'three';
import { ReactExtendedMaterial } from './ReactExtendedMaterial';
import { MeshPhysicalMaterialProps, useThree } from '@react-three/fiber';
import { forwardRef, useEffect } from 'react';

const RimGlow = {
  name: 'rim-glow',
  uniforms: {
    glowIntensity: 1,
    glowColor: new Color('#2E3FFF'),
    glowPower: 5,
  },
  vertexShader: (shader: any) => {
    if (!shader.includes('vViewPosition')) {
      shader = `
          varying vec3 vViewPosition;
          varying vec2 vUv;

          ${shader.replace(
        '#include <project_vertex>',
            /*glsl*/ `
            #include <project_vertex>
            vUv = uv;
            vViewPosition = -mvPosition.xyz;
            `
      )}
        `;
    } else {
      shader = `
      varying vec2 vUv;

      ${shader.replace(
        '#include <project_vertex>',
        /*glsl*/ `
        #include <project_vertex>
        vUv = uv;
        `
      )}
    `;
    }

    return shader;
  },
  fragmentShader: (shader: any) => {
    shader = `
    uniform float glowIntensity;
    uniform vec3 glowColor;
    uniform float glowPower;


        ${shader.replace(
      '#include <opaque_fragment>',
          /*glsl*/ `
    float rim = pow(1.0 - dot(normal, vec3(0, 0, 1)), glowPower);

    float a = min(1.0, rim * glowIntensity);
    outgoingLight = outgoingLight * (1.0 - a) + a  * glowColor;

          #include <opaque_fragment>
          `
    )}
      `;

    return shader;
  },
};

export interface MeshPhysicalMaterialWithGlowProps extends MeshPhysicalMaterialProps {
  glowIntensity: number;
  glowColor: Color;
  glowPower: number;
}

export const MeshPhysicalMaterialWithGlow = forwardRef<MeshPhysicalMaterial, MeshPhysicalMaterialWithGlowProps>((props, ref) => {
  const {
    glowColor,
    glowIntensity,
    glowPower,
    ...rest
  } = props;
  return <ReactExtendedMaterial
    ref={ref}
    superMaterial={MeshPhysicalMaterial}
    extensions={[RimGlow]}
    parameters={{
      glowColor,
      glowIntensity,
      glowPower,
    }}
    {...rest}
  />;
});
