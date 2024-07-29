import { FC } from 'react';
import { styled } from '@styled-system/jsx';

import { Logo } from './components';
import { MailIcon, GlobalIcon, FAQIcon, FacebookIcon } from './icons';
import { EMAIL, FAQ_LINK, FE_GROUP_LINK } from '~/shared/constants';

const Footer: FC = () => {
  return (
    <Container>
      <Wrap>
        <LogoWrap>
          <Logo />
        </LogoWrap>
        <LinkWrap>
          <Link target="_blank" href={`mailto:${EMAIL}`}>
            <IconWrap>
              <MailIcon />
            </IconWrap>
            feconf@googlegroups.com
          </Link>
          <Link target="_blank" href={FE_GROUP_LINK}>
            <IconWrap>
              <FacebookIcon />
            </IconWrap>
            프론트엔드개발그룹
          </Link>
          <Link target="_blank" href="https://2023.feconf.kr">
            <IconWrap>
              <GlobalIcon />
            </IconWrap>
            FEConf 2023
          </Link>
          <Link target="_blank" href={FAQ_LINK}>
            <IconWrap>
              <FAQIcon />
            </IconWrap>
            FAQ
          </Link>
        </LinkWrap>
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
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    justifyContent: 'space-between',
    padding: {
      base: '20px 16px 60px 16px',
      xl: '64px 80px 60px 80px',
    },
    gap: {
      base: '22px',
      xl: 'initial',
    },
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

const LinkWrap = styled('div', {
  base: {
    display: 'flex',
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    gap: {
      base: '6px',
      xl: '31px',
    },
  },
});

const Link = styled('a', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: {
      base: '10px',
      xl: '12px',
    },
    fontSize: {
      base: '12px',
      xl: '14px',
    },
    lineHeight: '140%',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const IconWrap = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: {
      base: '26px',
      xl: '28px',
    },
    height: {
      base: '26px',
      xl: '28px',
    },
    borderRadius: '8px',
    backgroundColor: 'rgba(78, 77, 96, 0.3)',
  },
});

const Rights = styled('span', {
  base: {
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: {
      base: 'left',
      xl: 'right',
    },
    fontVariantNumeric: 'lining-nums tabular-nums',
    fontSize: {
      base: '12px',
      xl: '14px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%',
    letterSpacing: '0.28px',
  },
});

export default Footer;
