import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { LocationIcon, TimeIcon } from '~/shared/icons';

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

const Container = styled('div', {
  base: {
    display: 'flex',
    gap: '30px',
  },
});

const Wrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
});

const IconWrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
});

const Text = styled('span', {
  base: {
    color: '#fff',
    textAlign: 'center',
    fontVariantNumeric: 'lining-nums tabular-nums',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '140%',
  },
});

export default DataLocation;
