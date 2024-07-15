'use client';

import { FC, useEffect, useState } from 'react';
import HeroSection from '../HeroSection';
import IntroSection from '../IntroSection';
import { useIntersection } from '@mantine/hooks';
import { useAurora } from '@/features/aurora/contexts';

const HeroIntroWrap: FC = () => {
  const { ref: heroRef, entry: heroEntry } = useIntersection<HTMLElement>({
    threshold: 0.3,
  });
  const { ref: introRef, entry: introEntry } = useIntersection<HTMLElement>({
    threshold: 0.3,
  });
  const { show, hide } = useAurora();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 200);
  }, []);
  useEffect(() => {
    const isInSection = heroEntry?.isIntersecting || introEntry?.isIntersecting;
    isInSection ? hide() : show();
  }, [heroEntry?.isIntersecting, introEntry?.isIntersecting, show, hide]);
  return (
    <>
      <HeroSection
        ref={heroRef}
        active={heroEntry?.isIntersecting && mounted}
      />
      <IntroSection ref={introRef} active={introEntry?.isIntersecting} />
    </>
  );
};

export default HeroIntroWrap;
