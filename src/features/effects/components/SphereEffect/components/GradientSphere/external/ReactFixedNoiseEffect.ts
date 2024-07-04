import { wrapEffect } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import FixedNoiseEffect from './FixedNoiseEffect';

export const ReactFixedNoiseEffect = wrapEffect(FixedNoiseEffect, {
  blendFunction: BlendFunction.COLOR_DODGE,
});
