import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { motion, Variants } from 'framer-motion';

interface Props {
  title: string;
  description?: string;
}

const line: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hidden: {
    opacity: 0,
    y: '20px',
    transition: { duration: 0.25 },
  },
};

const SectionTitle: FC<Props> = ({ title, description }) => {
  return (
    <Container>
      <Title variants={line}>{title}</Title>
      {description && (
        <Description
          variants={line}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </Container>
  );
};

const Container = styled('div', {
  base: {},
});

const Title = styled(motion.h1, {
  base: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '130%',
    textAlign: 'center',
  },
});

const Description = styled(motion.p, {
  base: {
    marginTop: '30px',
    maxWidth: '700px',
    color: '#fff',
    textWrap: 'wrap',
    textAlign: 'center',
    fontSize: '48px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

export default SectionTitle;
