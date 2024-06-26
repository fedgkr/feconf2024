import { FC } from 'react';
import { styled } from '@pigment-css/react';

interface Props {
  grade: string;
}

const SponsorInfo: FC<Props> = ({ grade }) => {
  return (
    <Container>
      <Grade>{grade}</Grade>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 920px;
  height: 230px;
  justify-content: center;
  border-radius: 20px;
  background: rgba(78, 77, 96, 0.2);
`;

const Grade = styled.h2`
  margin-top: 30px;
`;

export default SponsorInfo;
