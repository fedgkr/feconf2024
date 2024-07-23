import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { Column, FadeIn, SectionTitle } from '~/shared/components';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EMAIL, FE_GROUP_LINK } from '~/shared/constants';

const container: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const ContactSection: FC = () => {
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
        <SectionTitle title="Share & Contact" />
        <Wrap>
          <Item distance={30}>
            <Title>Share</Title>
            <Description>
              국내 최고의 프론트엔드 개발 인사이트를 얻을 수 있는 기회를
              공유하여 함께 배우고, 함께 성장해보세요.
            </Description>
            <Link target="_blank" href={FE_GROUP_LINK}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M12.7076 18.3644L11.2933 19.7786C9.34072 21.7313 6.1749 21.7313 4.22228 19.7786C2.26966 17.826 2.26966 14.6602 4.22228 12.7076L5.63649 11.2933M18.3644 12.7076L19.7786 11.2933C21.7312 9.34072 21.7312 6.1749 19.7786 4.22228C17.826 2.26966 14.6602 2.26966 12.7076 4.22228L11.2933 5.63649M8.50045 15.5004L15.5005 8.50043"
                    stroke="#010308"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span>프론트엔드개발그룹</span>
            </Link>
          </Item>
          <Item distance={30}>
            <Title>Contact</Title>
            <Description>
              접근성 관련하여 행사 참석에 도움이 필요하실 경우, 메일로 편하게
              연락주세요. 프론트엔드 개발자에 의한, 프론트엔드 개발자를 위한
              FEConf의 발전을 위해 도움을 주실 분도 언제든 환영합니다.
            </Description>
            <Link target="_blank" href={`mailto:${EMAIL}`}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    id="Icon"
                    d="M6 18L18 6M18 6H10M18 6V14"
                    stroke="#010308"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span>메일 보내기</span>
            </Link>
          </Item>
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

const Wrap = styled('div', {
  base: {
    marginTop: {
      base: '50px',
      xl: '130px',
    },
    display: 'flex',
    flexDirection: {
      base: 'column',
      xl: 'row',
    },
    gap: {
      base: '20px',
      xl: '50px',
    },
  },
});

const Item = styled(FadeIn, {
  base: {
    position: 'relative',
    display: 'flex',
    width: {
      base: '100%',
      xl: '540px',
    },
    height: {
      base: 'initial',
      xl: '336px',
    },
    padding: {
      base: '20px 20px 100px 20px',
      xl: '50px',
    },
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    textAlign: 'center',
    fontSize: {
      base: '16px',
      xl: '30px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '130%',
    letterSpacing: '1.2px',
  },
});

const Description = styled('div', {
  base: {
    marginTop: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160%',
  },
});

const Link = styled('a', {
  base: {
    position: 'absolute',
    right: {
      base: '20px',
      xl: '52px',
    },
    bottom: {
      base: '30px',
      xl: '50px',
    },
    display: 'flex',
    padding: {
      base: '10px 14px',
      xl: '16px 22px',
    },
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: {
      base: '5px',
      xl: '10px',
    },
    gap: {
      base: '6px',
      xl: '12px',
    },
    color: '#010308',
    fontSize: {
      base: '14px',
      xl: '16px',
    },
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '130%',
    background: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(3.1121041774749756px)',
    '& > svg': {
      width: {
        base: '20px',
        xl: 'initial',
      },
      height: {
        base: '20px',
        xl: 'initial',
      },
    },
  },
});

export default ContactSection;
