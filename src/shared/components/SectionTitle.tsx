import { FC } from 'react';
import { styled } from '@pigment-css/react';

interface Props {
  title: string;
  description: string;
}

const SectionTitle: FC<Props> = ({ title, description }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1`
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 30px;
  max-width: 700px;
  color: #fff;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

export default SectionTitle;
