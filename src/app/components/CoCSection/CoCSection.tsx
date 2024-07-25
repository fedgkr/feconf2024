import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, SectionTitle } from '~/shared/components';
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

const CoCSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <Section
      ref={ref}
      animate={inView ? 'visible' : 'hidden'}
      variants={container}
    >
      <Column style={{ maxWidth: 946, margin: '0 auto' }}>
        <SectionTitle
          title="Code of Conduct"
          description="FEConf에 참여하는 모든 분은<br/>다음 사항을 준수해주세요"
        />
        <CoCList>
          <CoCItem>
            <Wrap>
              <Item distance={30}>
                <Title>다양성</Title>
                <Description>
                  FEConf는 개개인의 정체성과 개성 및 취향을 존중합니다. 하지만
                  성별, 성 정체성, 외모, 인종, 종교, 지역, 장애, 나이, 국가,
                  약자 등에 대한 혐오와 폭력은 어떤 방식이라도 허용하지
                  않습니다.
                </Description>
              </Item>
              <Item distance={30}>
                <Title>사회적 책임</Title>
                <Description>
                  FEConf참여자는 프론트엔드 분야의 성장에 대한 사회적 책임을
                  가집니다. 내가 알고 있는 지식은 아무리 작은 것이라도 다른
                  누군가에 도움을 줄 수 있습니다. 이를 다양한 방법으로
                  공유하세요.
                </Description>
              </Item>
            </Wrap>
          </CoCItem>
          <CoCItem>
            <Wrap>
              <Item distance={30}>
                <Title>서로 돕고 협력하기</Title>
                <Description>
                  참여자의 다양한 배경이 협업과 커뮤니케이션을 방해하는 요소가
                  될 수 없습니다. 도움을 요청하기 전에 먼저 도움을 주고 자신의
                  생각을 자유롭게 표현할 수 있는 FEConf가 될 수 있도록 노력해
                  주세요.
                </Description>
              </Item>
              <Item distance={30}>
                <Title>지식 재산권 및 개인 정보</Title>
                <Description>
                  FEConf는 지식 재산권과 개인 정보 등의 권리를 존중합니다. 지식
                  재산권을 위배하거나 개인 정보를 침해하는 어떠한 콘텐츠도
                  FEConf에서 사용할 수 없습니다.
                </Description>
              </Item>
            </Wrap>
          </CoCItem>
        </CoCList>
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

const CoCList = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: {
      base: '50px',
      xl: '130px',
    },
    gap: {
      base: '20px',
      xl: '30px',
    },
  },
});

const CoCItem = styled('li', {
  base: {
    display: 'flex',
  },
});

const Wrap = styled(FadeIn, {
  base: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    gap: {
      base: '20px',
      xl: '30px',
    },
  },
});

const Item = styled(FadeIn, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: {
      base: '100%',
      xl: '540px',
    },
    padding: {
      base: '20px',
      xl: '40px',
    },
    alignItems: 'flex-start',
    flexShrink: 0,
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Title = styled('h4', {
  base: {
    color: '#fff',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '140%',
  },
});

const Description = styled('p', {
  base: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '160%',
    marginTop: {
      base: '10px',
      xl: '20px',
    },
  },
});

export default CoCSection;
