import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import FadeIn from '~/shared/components/FadeIn';

interface Props {
  title: string;
  description?: string;
}

const SectionTitle: FC<Props> = ({ title, description }) => {
  return (
    <Container>
      <Title distance={30}>{title}</Title>
      {description && (
        <FadeIn distance={30}>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
        </FadeIn>
      )}
    </Container>
  );
};

const Container = styled('div', {
  base: {},
});

const Title = styled(FadeIn, {
  base: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: {
      base: '18px',
      xl: '24px',
    },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '130%',
    textAlign: 'center',
  },
});

const Description = styled('p', {
  base: {
    marginTop: '30px',
    maxWidth: '700px',
    color: '#fff',
    textWrap: 'wrap',
    textAlign: 'center',
    fontSize: {
      base: '20px',
      xl: '48px',
    },
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

export default SectionTitle;
