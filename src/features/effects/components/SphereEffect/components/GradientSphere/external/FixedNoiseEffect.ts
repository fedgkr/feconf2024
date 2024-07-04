// https://github.com/pmndrs/postprocessing/blob/main/src/effects/NoiseEffect.js
import { Effect, BlendFunction } from 'postprocessing';

const fragmentShader = `void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float time = 1.0;
	vec3 noise = vec3(rand(uv * (1.0 + time)));

	#ifdef PREMULTIPLY

		outputColor = vec4(min(inputColor.rgb * noise, vec3(1.0)), inputColor.a);

	#else

		outputColor = vec4(noise, inputColor.a);

	#endif

}`;

export default class FixedNoiseEffect extends Effect {
  /**
   * Constructs a new noise effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.SCREEN] - The blend function of this effect.
   * @param {Boolean} [options.premultiply=false] - Whether the noise should be multiplied with the input colors prior to blending.
   */

  constructor({
    blendFunction = BlendFunction.SCREEN,
    premultiply = false,
  } = {}) {
    super('FixedNoiseEffect', fragmentShader, { blendFunction });
    this.premultiply = premultiply;
  }

  /**
   * Indicates whether noise will be multiplied with the input colors prior to blending.
   *
   * @type {Boolean}
   */

  get premultiply() {
    return this.defines.has('PREMULTIPLY');
  }

  set premultiply(value) {
    if (this.premultiply !== value) {
      if (value) {
        this.defines.set('PREMULTIPLY', '1');
      } else {
        this.defines.delete('PREMULTIPLY');
      }
      this.setChanged();
    }
  }

  /**
   * Indicates whether noise will be multiplied with the input colors prior to blending.
   *
   * @deprecated Use premultiply instead.
   * @return {Boolean} Whether noise is premultiplied.
   */

  isPremultiplied() {
    return this.premultiply;
  }

  /**
   * Controls whether noise should be multiplied with the input colors prior to blending.
   *
   * @deprecated Use premultiply instead.
   * @param {Boolean} value - Whether noise should be premultiplied.
   */

  setPremultiplied(value: boolean) {
    this.premultiply = value;
  }
}
