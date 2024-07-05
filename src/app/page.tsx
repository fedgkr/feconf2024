import { styled } from '@pigment-css/react';
import { HeroSection, IntroSection, SponsorSection } from './components';
import { Header } from '@/shared/components';
import { AuroraWrap, AuroraProvider } from '@/features/aurora';
import { SphereEffect } from '@/features/effects/components';

function Home() {
  return (
    <AuroraProvider>
      <Main>
        <Header />
        <HeroSection />
        <IntroSection />
        <SponsorSection />
        <SponsorSection />
        <AuroraWrap />
        <SphereEffect />
      </Main>
    </AuroraProvider>
  );
}

const Main = styled.main`
  height: 500vh;
`;

export default Home;
