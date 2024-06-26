import { styled } from '@pigment-css/react';
import { HeroSection, IntroSection, SponsorSection } from './components';
import { Header } from '@/shared/components';

function Home() {
  return (
    <Main>
      <Header />
      <HeroSection />
      <IntroSection />
      <SponsorSection />
      <SponsorSection />
    </Main>
  );
}

const Main = styled.main``;

export default Home;
