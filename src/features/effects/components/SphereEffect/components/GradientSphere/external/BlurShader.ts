// https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/HorizontalBlurShader.js

export const BlurShader = {
  name: 'BlurShader',
  uniforms: {
    tDiffuse: { value: null },
    uBlurOffset: { value: 1 / 512 },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform float uBlurOffset;

		varying vec2 vUv;

		void main() {
      gl_FragColor = 0.25 * (
        texture2D( tDiffuse, vUv + uBlurOffset )
        + texture2D( tDiffuse, vUv - uBlurOffset )
        + texture2D( tDiffuse, vUv + uBlurOffset * vec2( 1., -1. ) )
        + texture2D( tDiffuse, vUv + uBlurOffset * vec2( -1., 1. ) )
      );
		}`,
};
