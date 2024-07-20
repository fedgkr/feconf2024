import { FC } from 'react';
import { styled } from '@styled-system/jsx';

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

const Container = styled('header', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(2, 3, 7, 0.1)',
    backdropFilter: 'blur(10px)',
    zIndex: 1,
  },
});

const Wrap = styled('div', {
  base: {
    height: '66px',
    maxWidth: '1366px',
    margin: '0 auto',
    padding: '0 50px 0 80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const LogoWrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
});

const Divider = styled('div', {
  base: {
    width: '50px',
    height: '1px',
    background: 'linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%)',
  },
});

const Date = styled('span', {
  base: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '140%',
  },
});

const ActionWrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
});

const Place = styled('span', {
  base: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '140%',
  },
});

const TicketButton = styled('span', {
  base: {
    display: 'flex',
    width: '118px',
    height: '39px',
    padding: '16px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#010308',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '130%',
    borderRadius: '6px',
    backgroundColor: '#fff',
    backdropFilter: 'blur(3px)',
  },
});

export default Header;
