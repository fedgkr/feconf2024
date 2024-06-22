import { styled } from '@pigment-css/react';
import { HeroSection, IntroSection } from './components';

function Home() {
  return (
    <Main>
      <HeroSection />
      <IntroSection />
    </Main>
  );
}

const Main = styled.main``;

export default Home;
