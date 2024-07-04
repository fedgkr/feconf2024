// https://github.com/ycw/three-kawase-blur
// https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/HorizontalBlurShader.js

import {
  IUniform,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import {
  EffectComposer,
  Pass,
  FullScreenQuad,
} from 'three/examples/jsm/Addons.js';

const BlurShader = {
  name: 'BlurShader',

  uniforms: {
    tDiffuse: { value: null },
    uBlurs: { value: [] },
    uCount: { value: 0 },
    uBlurCount: { value: 0 },
    uBlurOffset: { value: 0 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform sampler2D tDiffuse;
    uniform float uBlurs[200];
    uniform float uBlurCount;
    uniform float uBlurOffset;
    uniform int uCount;
		varying vec2 vUv;

    void main() {
      vec4 sum = vec4(0.0);

      // for (int i = 0; i < uCount; ++i) {
      //   float x = float(uBlurs[i * 3 + 0]);
      //   float y = float(uBlurs[i * 3 + 1]);
      //   float mul = float(uBlurs[i * 3 + 2]);

      //   vec2 pos = vUv + vec2(x, y);
        
      //   if (pos.x <= 0.0 || pos.y <= 0.0 || pos.x >= 1.0 || pos.y >= 1.0) {
      //     continue;
      //   }
      //   sum += mul * texture2D(tDiffuse, pos);
      // }

      gl_FragColor = 0.25 * (
        texture2D(tDiffuse, vUv + uBlurOffset)
        + texture2D(tDiffuse, vUv - uBlurOffset)
        + texture2D(tDiffuse, vUv + uBlurOffset * vec2(1.0, -1.0))
        + texture2D(tDiffuse, vUv + uBlurOffset * vec2(-1.0, 1.0))
      );

			// sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * uBlurOffset, vUv.y ) ) * 0.051;
			// sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * uBlurOffset, vUv.y ) ) * 0.0918;
			// sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * uBlurOffset, vUv.y ) ) * 0.12245;
			// sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * uBlurOffset, vUv.y ) ) * 0.1531;
			// sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			// sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * uBlurOffset, vUv.y ) ) * 0.1531;
			// sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * uBlurOffset, vUv.y ) ) * 0.12245;
			// sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * uBlurOffset, vUv.y ) ) * 0.0918;
			// sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * uBlurOffset, vUv.y ) ) * 0.051;

      gl_FragColor = sum;
    }`,
};

function fact(main: number) {
  let j = 1;

  for (let i = 1; i <= main; ++i) {
    j *= i;
  }
  return j;
}

export class InternalBlurPass extends Pass {
  fsQuad: FullScreenQuad;
  uniforms: Record<string, IUniform>;
  material: ShaderMaterial;
  constructor(public renderer: WebGLRenderer) {
    super();

    // const uniforms = UniformsUtils.clone(BlurShader.uniforms);
    this.material = new ShaderMaterial(BlurShader);
    this.fsQuad = new FullScreenQuad(this.material);
    this.uniforms = this.material.uniforms;
  }

  setBlurs(blurOffset: number, blurCount: number) {
    const res = this.renderer.getDrawingBufferSize(new Vector2());

    function getBlurOffsets(count: number) {
      const obj: Record<string, number> = {};

      for (let x = -count; x <= count; ++x) {
        for (let y = -count; y <= count; ++y) {
          const absX = Math.abs(x);
          const absY = Math.abs(y);
          const isOddX = !!(absX % 2);
          const isOddY = !!(absY % 2);

          if (absX + absY > count) {
            continue;
          }

          for (let num = 1; num <= count; ++num) {
            const isOddNum = !!(num % 2);

            if (
              (isOddNum && !isOddX && !isOddY) ||
              (!isOddNum && isOddX !== isOddY) ||
              absX > num ||
              absY > num ||
              absX + absY > num
            ) {
              continue;
            }
            for (let xCount = isOddX ? 1 : 0; xCount <= num; xCount += 2) {
              const yCount = num - xCount;

              if (absX > xCount || absY > yCount || isOddY !== !!(yCount % 2)) {
                continue;
              }

              const mainX = (absX + xCount) / 2;
              const mainY = (absY + yCount) / 2;

              const caseCount =
                fact(xCount + yCount) /
                fact(xCount - mainX) /
                fact(mainX) /
                fact(yCount - mainY) /
                fact(mainY);

              obj[`${x}x${y}`] = (obj[`${x}x${y}`] || 0) + caseCount;
            }
          }
        }
      }
      return obj;
    }

    const offsets = getBlurOffsets(blurCount - 1);
    const blurs: number[] = [];
    const entries = Object.entries(offsets);
    const mul = Math.pow(0.2, blurCount);
    const zeroVec = new Vector2(0, 0);
    const posMul = Math.pow(2, 0.5);

    entries.forEach(([k, v]) => {
      let pos = k.split('x').map(v => parseFloat(v));
      const opacity = v * mul;

      if (opacity < 0.001) {
        return;
      }
      const vec = new Vector2(pos[0], pos[1]);
      const vec2 = vec.rotateAround(zeroVec, Math.PI / 4);

      pos = [posMul * vec2.x, posMul * vec2.y];
      blurs.push(
        (blurOffset * pos[0]) / res.x,
        (blurOffset * pos[1]) / res.y,
        opacity
      );
    });
    // console.log(offsets, blurs);s

    // console.log(true, getBlurOffsets([0, 0], arr.length));
    // console.log(false, getBlurOffsets2(arr.length));
    // uBlurOffset
    this.uniforms.uBlurOffset.value = blurOffset / res.y;
    this.uniforms.uBlurs.value = blurs;
    this.uniforms.uBlurCount.value = blurCount - 1;
    this.uniforms.uCount.value = entries.length;
  }
  render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget
  ) {
    this.uniforms['tDiffuse'].value = readBuffer.texture;
    this.material.needsUpdate = true;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
    }
    this.fsQuad.render(renderer);
  }
  dispose() {
    this.material.dispose();
    this.fsQuad.dispose();
  }
}

export class BlurPass extends Pass {
  _internalComposer: EffectComposer;
  _pass: InternalBlurPass;
  _blurOffset = 0;
  _blurCount = 0;
  constructor(public renderer: WebGLRenderer) {
    super();
    this.renderer = renderer;
    this._internalComposer = new EffectComposer(
      renderer,
      new WebGLRenderTarget(0, 0)
    );

    this._pass = new InternalBlurPass(renderer);
    this._internalComposer.addPass(this._pass);
  }

  setBlurs(blurOffset: number, blurCount: number) {
    this._blurCount = blurCount;
    this._blurOffset = blurOffset;
    this._pass.setBlurs(blurOffset, blurCount);
    this._internalComposer.reset();
  }
  render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget
  ) {
    this._internalComposer.readBuffer = readBuffer;
    this._internalComposer.writeBuffer = writeBuffer;
    this._internalComposer.render(renderer);
  }

  setSize(w: number, h: number) {
    this._internalComposer.setSize(w, h);
    this.setBlurs(this._blurOffset, this._blurCount);
  }
}
