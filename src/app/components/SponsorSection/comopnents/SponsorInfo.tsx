import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { motion, Variants } from 'framer-motion';

interface Props {
  grade: string;
}

const line: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hidden: {
    opacity: 0,
    y: '30px',
    transition: { duration: 0.25 },
  },
};

const SponsorInfo: FC<Props> = ({ grade }) => {
  return (
    <Container variants={line}>
      <Grade>{grade}</Grade>
    </Container>
  );
};

const Container = styled(motion.div, {
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
