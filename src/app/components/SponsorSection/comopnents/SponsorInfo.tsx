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
    width: '920px',
    height: '230px',
    justifyContent: 'center',
    borderRadius: '20px',
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Grade = styled('h2', {
  base: {
    marginTop: '30px',
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: '1.4',
  },
});

export default SponsorInfo;
