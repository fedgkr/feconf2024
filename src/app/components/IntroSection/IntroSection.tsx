import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { Column } from '@/shared/components';

const IntroSection: FC = () => {
  return (
    <Section>
      <Column>
        <Title>프론트 엔지니어들에 의한,</Title>
        <Title>프론트 엔지니어들에 위한</Title>
        <Title>국내 최대 프론트엔드 컨퍼런스 FEConf</Title>
        <Description>
          더 나은 프론트 엔지니어링을 위해 노력하는 이들이 함께 모여 현장에서
          겪는 다양한 문제를 함께 공유하고 성장합니다.
        </Description>
      </Column>
    </Section>
  );
};

const Section = styled.section`
  padding: 180px 0 685px 0;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  line-height: 2;
  color: #010308;
  opacity: 0.5;
`;

const Description = styled.p`
  width: 492px;
  margin-top: 80px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.6;
  color: #010308;
`;

export default IntroSection;
