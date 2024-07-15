import { FC } from 'react';
import { styled } from '@pigment-css/react';

import { Logo } from './components';

const Footer: FC = () => {
  return (
    <Container>
      <Wrap>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <Rights>© FEConf 2024 All rights reserved.</Rights>
      </Wrap>
    </Container>
  );
};

const Container = styled.footer``;

const Wrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 64px 80px 60px 80px;
  max-width: 1366px;
  margin: 0 auto;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Rights = styled.span`
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.28px;
`;

export default Footer;
