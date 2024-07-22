'use client';

import { FC, useEffect, useState } from 'react';
import HeroSection from '../HeroSection';
import IntroSection from '../IntroSection';
import { useInView } from 'react-intersection-observer';
import { useAurora } from '~/features/aurora/contexts';

const HeroIntroWrap: FC = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: introRef, inView: introInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { show, hide } = useAurora();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 200);
  }, []);
  useEffect(() => {
    const isInSection = heroInView || introInView;
    isInSection ? hide() : show();
  }, [heroInView, introInView, show, hide]);
  return (
    <>
      <HeroSection ref={heroRef} active={heroInView && mounted} />
      <IntroSection ref={introRef} active={introInView} />
    </>
  );
};

export default HeroIntroWrap;
