import { FC } from 'react';
import { styled } from '@pigment-css/react';

import { Logo } from './components';

const Header: FC = () => {
  return (
    <Container>
      <Wrap>
        <LogoWrap>
          <Logo />
          <Divider />
          <Date>2024.8.24</Date>
        </LogoWrap>
        <ActionWrap>
          <Place>서울특별시 광진구 능동로 209 | 세종대학교 광개토회관</Place>
          <TicketButton>티켓 구매하기</TicketButton>
        </ActionWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(2, 3, 7, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const Wrap = styled.div`
  height: 66px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 50px 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  '@media (min-width: 768px)': {
    height: 30px;
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Divider = styled.div`
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
`;

const Date = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const Place = styled.span`
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
`;

const TicketButton = styled.span`
  display: flex;
  width: 118px;
  height: 39px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  color: #010308;
  font-size: 14px;
  font-weight: 700;
  line-height: 130%;
  border-radius: 6px;
  background-color: #fff;
  backdrop-filter: blur(3px);
`;

export default Header;
