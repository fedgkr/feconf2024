import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useHeroScreen() {
  const sizeRef = useRef({ width: 0, height: 0 });
  const scrollRef = useRef(0);
  const screenSizeRef = useRef<DOMRect[]>([]);
  const target = useMemo(() => new EventTarget(), []);

  const scroll = useCallback(
    (unScroll?: boolean) => {
      scrollRef.current = document.documentElement.scrollTop;
      if (!unScroll) target.dispatchEvent(new CustomEvent('scroll'));
    },
    [target]
  );
  const resize = useCallback(
    (unDispatch?: boolean) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height };
      screenSizeRef.current = [...document.querySelectorAll('section')].map(
        el => {
          return el.getBoundingClientRect();
        }
      );
      if (!unDispatch) {
        target.dispatchEvent(new CustomEvent('resize'));
      }
    },
    [target]
  );

  const onScroll = useCallback(
    (callback: () => void) => {
      target.addEventListener('scroll', callback);
    },
    [target]
  );

  const onResize = useCallback(
    (callback: () => void) => {
      target.addEventListener('resize', callback);
    },
    [target]
  );

  useEffect(() => {
    const resizeCallback = () => resize();
    const scrollCallback = () => scroll();

    window.addEventListener('resize', resizeCallback);
    window.addEventListener('scroll', scrollCallback);

    resizeCallback();
    scrollCallback();
    return () => {
      window.removeEventListener('resize', resizeCallback);
      window.removeEventListener('scroll', scrollCallback);
    };
  }, [resize, scroll]);

  return {
    sizeRef,
    scrollRef,
    screenSizeRef,
    scroll,
    resize,
    onScroll,
    onResize,
    dispatch(eventName: string) {
      target.dispatchEvent(new CustomEvent(eventName));
    },
  };
}
