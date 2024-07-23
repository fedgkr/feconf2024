'use client';

import {
  ChildcareSection,
  CoCSection,
  ContactSection,
  FooterSection,
  HeroIntroWrap,
  OpenSourceSection,
  ProgramSection,
  SponsorSection,
} from './components';
import { Header, Footer } from '~/shared/components';
import { AuroraProvider } from '~/features/aurora/contexts';
import { EffectWrap } from '~/features/effects/components';

import { styled } from '@styled-system/jsx';

function Home() {
  return (
    <AuroraProvider>
      <Main>
        <Header />
        <HeroIntroWrap />
        <SponsorSection />
        <ProgramSection />
        <ChildcareSection />
        <CoCSection />
        <OpenSourceSection />
        <ContactSection />
        <FooterSection />
        <EffectWrap />
        <Footer />
      </Main>
    </AuroraProvider>
  );
}

const Main = styled('main', {});

export default Home;
