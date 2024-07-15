import { FC } from 'react';
import { styled } from '@pigment-css/react';
import { LocationIcon, TimeIcon } from '@/shared/icons';

const DataLocation: FC = () => {
  return (
    <Container>
      <Wrap>
        <IconWrap>
          <TimeIcon />
        </IconWrap>
        <Text>2024.8.24</Text>
      </Wrap>
      <Wrap>
        <IconWrap>
          <LocationIcon />
        </IconWrap>
        <Text>세종대학교 광개토회관</Text>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 30px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
`;

const Text = styled.span`
  color: #fff;
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

export default DataLocation;
