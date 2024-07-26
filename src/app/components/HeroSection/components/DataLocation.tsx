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
        <Text className="test">세종대학교 광개토회관</Text>
      </Wrap>
    </Container>
  );
};

const Container = styled('div', {
  base: {
    display: 'flex',
    gap: {
      base: '12px',
      xl: '30px',
    },
  },
});

const Wrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: {
      base: '8px',
      xl: '20px',
    },
  },
});

const IconWrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: {
      base: '26px',
      xl: '34px',
    },
    height: {
      base: '26px',
      xl: '34px',
    },
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.3)',
    '& svg': {
      width: {
        base: '15px',
        xl: 'initial',
      },
      height: {
        base: '15px',
        xl: 'initial',
      },
    },
  },
});

const Text = styled('span', {
  base: {
    color: '#fff',
    textAlign: 'center',
    fontVariantNumeric: 'lining-nums tabular-nums',
    fontSize: {
      base: '14px',
      xl: '20px',
    },
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '140%',
  },
});

export default DataLocation;
