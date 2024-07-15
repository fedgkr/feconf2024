import { FC } from 'react';
import { styled } from '@pigment-css/react';
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

const Container = styled.div``;

const Title = styled(motion.h1)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
`;

const Description = styled(motion.p)`
  margin-top: 30px;
  max-width: 700px;
  color: #fff;
  text-wrap: wrap;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

export default SectionTitle;
