// https://github.com/ycw/three-kawase-blur
import { EffectComposer, Pass, FullScreenQuad } from 'three/examples/jsm/Addons.js';
import { KawaseBlurShader } from './KawaseBlurShader.js'
import { UniformsUtils, ShaderMaterial, WebGLRenderTarget, Vector2 } from 'three';

class _KawaseBlurPass extends Pass {
    constructor(uOffset, uOpacity) {
        super();

        const uniforms = UniformsUtils.clone(KawaseBlurShader.uniforms);
        uniforms.uOffset.value = uOffset;
        // uniforms.uOpacity.value = uOpacity;

        const material = new ShaderMaterial({
            uniforms,
            vertexShader: KawaseBlurShader.vertexShader,
            fragmentShader: KawaseBlurShader.fragmentShader,
        });

        this.fsQuad = new FullScreenQuad(material);
        this.uniforms = material.uniforms;
        this.shouldRenderToSreen = false;
    }

    render(renderer, writeBuffer, readBuffer) {
        this.uniforms['tDiffuse'].value = readBuffer.texture;

        if (this.shouldRenderToSreen) {
            renderer.setRenderTarget(null);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear();
        }
        this.fsQuad.render(renderer);
    }

}

export class KawaseBlurPass extends Pass {
    constructor({ renderer, blurCount, blurOffset, opacity = 1 }) {
        super();
        this._blurOpacity = opacity;
        this._renderer = renderer;
        this._internalComposer = new EffectComposer(renderer, new WebGLRenderTarget(0, 0));
        this.setBlurs(blurOffset, blurCount);
    }

    getKernels() {
        return Array.from(this._kernels);
    }

    setBlurs(blurOffset, blurCount) {
        const kernels = [];

        for (let i = 0; i < blurCount; ++i) {
        kernels.push(blurOffset);
        }
        const res = this._renderer.getDrawingBufferSize(new Vector2());

        for (const [i, k] of kernels.entries()) {
            const uOffset = new Vector2().setScalar(.5 + k).divide(res);

            const pass = this._internalComposer.passes[i];
            if (pass) { // reuse
                pass.uniforms.uOffset.value = uOffset;

                pass.shouldRenderToSreen = false;
            } else {
                this._internalComposer.addPass(new _KawaseBlurPass(uOffset, 1));
            }
        }

        this._internalComposer.passes.length = kernels.length; // rm unused
        this._internalComposer.reset();
        this._kernels = Array.from(kernels);
        this._blurOpacity = 1;
        this._blurOffset = blurOffset;
        this._blurCount = blurCount;
    }

    render(renderer, writeBuffer, readBuffer) {
        if (this._kernels.length === 0) return;
        // ---- transfer ownership
        this._internalComposer.readBuffer = readBuffer;
        this._internalComposer.writeBuffer = writeBuffer;
        this._internalComposer.passes[this._internalComposer.passes.length - 1].shouldRenderToSreen = this.renderToScreen;
        this._internalComposer.render(renderer);
    }

    setSize(w, h) {
        this._internalComposer.setSize(w, h);
        this.setBlurs(this._blurOffset, this._blurOpacity);
    }
}
