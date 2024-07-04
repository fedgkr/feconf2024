import { styled } from '@pigment-css/react';
import { HeroSection, IntroSection } from './components';
import { SphereEffect } from '@/features/effects/components';

function Home() {
  return (
    <Main>
      <SphereEffect />
      <HeroSection />
      <IntroSection />
    </Main>
  );
}

const Main = styled.main`
  height: 500vh;
`;

export default Home;
