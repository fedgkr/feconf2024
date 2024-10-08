import { FC } from 'react';
import { styled } from '@styled-system/jsx';

import { Logo } from './components';
import { Button } from '~/shared/components';
import { FAQ_LINK } from '~/shared/constants';

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
          <Button size="s" status="active" target="_blank" href={FAQ_LINK}>
            FAQ
          </Button>
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
    height: {
      base: '60px',
      xl: '66px',
    },
    maxWidth: '1366px',
    margin: '0 auto',
    padding: {
      base: '20px',
      xl: '0 50px 0 80px',
    },
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
    justifyContent: {
      base: 'space-between',
      xl: 'flex-start',
    },
    width: {
      base: '100%',
      xl: 'initial',
    },
  },
});

const Divider = styled('div', {
  base: {
    flexGrow: {
      base: 1,
      xl: 'initial',
    },
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
    display: {
      base: 'none',
      xl: 'flex',
    },
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

export default Header;
