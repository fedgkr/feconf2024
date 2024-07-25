// https://github.com/mrdoob/three.js/blob/master/examples/jsm/shaders/BokehShader.js

export const BokehShader = {
  name: 'BokehShader',
  uniforms: {
    tDiffuse: { value: null },
    focus: { value: 1.0 },
    aspect: { value: 1.0 },
    aperture: { value: 0.025 },
    maxblur: { value: 0.01 },
    nearClip: { value: 1.0 },
    farClip: { value: 1000.0 },
  },
  vertexShader: `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

  fragmentShader: `
		varying vec2 vUv;
		uniform sampler2D tDiffuse;

		uniform float maxblur; // max blur amount
		// uniform float aperture; // aperture - bigger values for shallower depth of field
		// uniform float nearClip;
		// uniform float farClip;

		// uniform float focus;


		void main() {
			vec2 aspectcorrect = vec2( 1.0, 1.0 );
			vec2 dofblur = vec2 (maxblur, maxblur);
			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tDiffuse, vUv.xy );
      // 16
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,   0.4  ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.15,  0.37 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29,  0.29 ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.37,  0.15 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.40,  0.0  ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.37, -0.15 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29, -0.29 ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.15, -0.37 ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,  -0.4  ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.15,  0.37 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.29,  0.29 ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.37,  0.15 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.4,   0.0  ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.37, -0.15 ) * dofblur );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.29, -0.29 ) * dofblur );
			col += texture2D( tDiffuse, vUv.xy + vec2(  0.15, -0.37 ) * dofblur );

      // 8
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.15,  0.37 ) * dofblur9 );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.37,  0.15 ) * dofblur9 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.37, -0.15 ) * dofblur9 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.15, -0.37 ) * dofblur9 );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.15,  0.37 ) * dofblur9 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.37,  0.15 ) * dofblur9 );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.37, -0.15 ) * dofblur9 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.15, -0.37 ) * dofblur9 );

      // 8
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29,  0.29 ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.40,  0.0  ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29, -0.29 ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,  -0.4  ) * dofblur7 );
			col += texture2D( tDiffuse, vUv.xy + vec2( -0.29,  0.29 ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.4,   0.0  ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.29, -0.29 ) * dofblur7 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,   0.4  ) * dofblur7 );

      // 8
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29,  0.29 ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.4,   0.0  ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.29, -0.29 ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,  -0.4  ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.29,  0.29 ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.4,   0.0  ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2( -0.29, -0.29 ) * dofblur4 );
			// col += texture2D( tDiffuse, vUv.xy + vec2(  0.0,   0.4  ) * dofblur4 );

			gl_FragColor = col / 15.0;
			gl_FragColor.a = 1.0;

		}`,
};
