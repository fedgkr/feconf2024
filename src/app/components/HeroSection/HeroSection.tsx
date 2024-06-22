import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { HeroLogo } from './components';
import { Column } from '@/shared/components';

const HeroSection: FC = () => {
  return (
    <Section>
      <Column>
        <Title>뜨거운 열정을 가진 당신이 올해의 주인공</Title>
        <LogoWrap>
          <HeroLogo />
        </LogoWrap>
        <Info>2024.08.24 세종대학교 광개토회관</Info>
        <PurchaseButton>티켓 구매하기</PurchaseButton>
      </Column>
    </Section>
  );
};

const Section = styled.section`
  padding: 170px 0 420px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: #ffffff;
`;

const LogoWrap = styled.div`
  margin-top: 70px;
`;

const Info = styled.p`
  margin-top: 70px;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
`;

const PurchaseButton = styled.button`
  margin-top: 90px;
  padding: 17px 0;
  border: none;
  border-radius: 10px;
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #010308;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  background-color: white;
`;

export default HeroSection;
