/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Reference: https://www.joshwcomeau.com/react/prefers-reduced-motion/
 */
import { useCallback, useEffect, useRef } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

export function usePrefersReducedMotionRef(
  _callback: (isReduced: boolean) => void
) {
  const callback = useCallback(_callback, []);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: any) => {
      const isReduced = !event.matches;
      reducedMotionRef.current = isReduced;
      callback(isReduced);
    };

    listener(window.matchMedia(QUERY));
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return reducedMotionRef;
}
