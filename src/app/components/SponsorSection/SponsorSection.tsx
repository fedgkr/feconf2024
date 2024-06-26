'use client';

import { FC, useEffect, useRef } from 'react';
import { styled } from '@pigment-css/react';
import { Column, SectionTitle } from '@/shared/components';
import { useIntersection } from '@mantine/hooks';

import { SponsorInfo } from './comopnents';

const SponsorSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.2,
  });
  useEffect(() => {
    window.showBackground(entry?.isIntersecting);
  }, [entry?.isIntersecting]);
  console.log('entry?.isIntersecting : ', entry?.isIntersecting);
  return (
    <Section ref={ref}>
      <Column>
        <SectionTitle
          title="Sponsors"
          description="프론트엔드 개발 생태계를 밝혀주는 2024 FEconf 후원사를 소개합니다"
        />
        <SponsorList>
          <SponsorInfo grade="Master" />
          <SponsorInfo grade="Diamond" />
          <SponsorInfo grade="Gold" />
        </SponsorList>
      </Column>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  padding: 500px 0 685px 0;
`;

const SponsorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 100px;
`;

export default SponsorSection;
