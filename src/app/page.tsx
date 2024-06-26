import { styled } from '@pigment-css/react';
import { HeroSection, IntroSection, SponsorSection } from './components';
import { Header } from '@/shared/components';
import { SphereEffect } from '@/features/effects/components';

function Home() {
  return (
    <Main>
      <SphereEffect />
      <Header />
      <HeroSection />
      <IntroSection />
      <SponsorSection />
      <SponsorSection />
    </Main>
  );
}

const Main = styled.main`
  height: 500vh;
`;

export default Home;
