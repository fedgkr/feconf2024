import { FC } from 'react';
import { styled } from '@styled-system/jsx';

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

const Container = styled('footer', {
  base: {},
});

const Wrap = styled('div', {
  base: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '64px 80px 60px 80px',
    maxWidth: '1366px',
    margin: '0 auto',
  },
});

const LogoWrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
});

const Rights = styled('span', {
  base: {
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'right',
    fontVariantNumeric: 'lining-nums tabular-nums',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%',
    letterSpacing: '0.28px',
  },
});

export default Footer;
