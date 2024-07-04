import { WebGLRenderer } from 'three';
import { BokehPass } from 'three/examples/jsm/Addons.js';

export class BokehPass2 extends BokehPass {
  render(renderer: WebGLRenderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/) {
    // Render depth into texture
    this.scene.overrideMaterial = this.materialDepth;

    renderer.getClearColor(this._oldClearColor);
    const oldClearAlpha = renderer.getClearAlpha();
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    renderer.setClearColor(0xffffff, 0);
    renderer.setClearAlpha(0.0);

    renderer.setRenderTarget(this.renderTargetDepth);
    renderer.clear();
    renderer.render(this.scene, this.camera);

    // Render bokeh composite

    this.uniforms['tColor'].value = readBuffer.texture;
    this.uniforms['nearClip'].value = this.camera.near;
    this.uniforms['farClip'].value = this.camera.far;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      renderer.clear();
      this.fsQuad.render(renderer);
    }
    this.scene.overrideMaterial = null;
    renderer.setClearColor(this._oldClearColor);
    renderer.setClearAlpha(oldClearAlpha);
    renderer.autoClear = oldAutoClear;
  }
}