import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, SectionTitle } from '~/shared/components';

import patternLogo from './assets/ts-pattern.png';
import pretendardLogo from './assets/pretendard.png';
import zodLogo from './assets/zod.png';
import kyLogo from './assets/ky.png';
import queryLogo from './assets/query.png';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const OpenSourceSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <Section
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column>
        <SectionTitle
          title="Open Source"
          description="프론트엔드 개발 생태계를 위해<br/>오픈소스를 후원합니다"
        />
        <Wrap distance={0} duration={{ in: 0.2 }}>
          <FadeIn distance={30}>
            <List>
              <Item>
                <Image src={patternLogo.src} alt="ts-pattern" />
              </Item>
              <Item>
                <Image
                  src={pretendardLogo.src}
                  alt="Pretendard"
                  style={{ padding: '14px' }}
                />
              </Item>
              <Item>
                <Image src={zodLogo.src} alt="Zod" />
              </Item>
              <Item>
                <Image src={kyLogo.src} alt="KY" />
              </Item>
              <Item>
                <Image src={queryLogo.src} alt="React Query" />
              </Item>
            </List>
          </FadeIn>
          <FadeIn distance={30}>
            <Description>
              프론트엔드 오픈소스 프로젝트에 대한 감사의 마음을 담아 FEConf에서
              후원을 진행합니다. <Br />
              행사 현장에서 오픈소스 이벤트에 참여하고, 후원할 프로젝트에 직접
              투표하세요! <Br />
              여러분의 투표 결과에 따라 오픈소스 프로젝트에 대한 후원 금액이
              결정됩니다.
            </Description>
          </FadeIn>
        </Wrap>
      </Column>
    </Section>
  );
};

const Section = styled(motion.section, {
  base: {
    position: 'relative',
    padding: {
      base: '60px 20px',
      xl: '150px 0',
    },
  },
});

const Wrap = styled(FadeIn, {
  base: {
    display: 'flex',
    width: '100%',
    maxWidth: '920px',
    marginTop: {
      base: '50px',
      xl: '130px',
    },
    padding: {
      base: '20px 16px 30px 16px',
      xl: '40px 25px 60px 25px',
    },
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: {
      base: '20px',
      xl: '40px',
    },
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    background: 'rgba(78, 77, 96, 0.2)',
    boxShadow: '20px 20px 200px 0px rgba(1, 3, 8, 0.07)',
  },
});

const List = styled('ul', {
  base: {
    margin: {
      base: '0 auto',
    },
    display: 'flex',
    width: {
      base: '100%',
    },
    gap: {
      base: '10px',
      xl: '20px',
    },
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const Item = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'center',
    height: {
      base: '50px',
      xl: '70px',
    },
    boxSizing: 'content-box',
    marginTop: '16px',
  },
});

const Image = styled('img', {
  base: {
    height: {
      base: '50px',
      xl: '70px',
    },
  },
});

const Description = styled('p', {
  base: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: {
      base: '14px',
      xl: '18px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160%',
  },
});

const Br = styled('br', {
  base: {
    display: {
      base: 'none',
      xl: 'initial',
    },
  },
});

export default OpenSourceSection;
