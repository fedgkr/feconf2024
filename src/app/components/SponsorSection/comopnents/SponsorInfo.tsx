import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { FadeIn } from '~/shared/components';

interface Props {
  grade: string;
}

const SponsorInfo: FC<Props> = ({ grade }) => {
  return (
    <Container distance={30}>
      <Grade>{grade}</Grade>
    </Container>
  );
};

const Container = styled(FadeIn, {
  base: {
    display: 'flex',
    width: {
      base: '100%',
      xl: '920px',
    },
    height: {
      base: 'initial',
    },
    padding: {
      base: '20px 25px 30px 25px',
      xl: '30px 25px 28px 25px',
    },
    justifyContent: 'center',
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Grade = styled('h2', {
  base: {
    fontSize: {
      base: '16px',
      xl: '18px',
    },
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: '1.4',
  },
});

export default SponsorInfo;
