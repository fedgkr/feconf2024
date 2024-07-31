import { styled } from '@styled-system/jsx';

const Button = styled('a', {
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    fontWeight: '700',
    cursor: 'pointer',
    '&:not([href])': {
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      s: {
        width: '118px',
        height: '40px',
        fontSize: '14px',
        borderRadius: '6px',
      },
      m: {
        fontSize: {
          base: '16px',
          xl: '20px',
        },
        borderRadius: '10px',
        maxWidth: '300px',
        width: {
          base: '100%',
          xl: '240px',
        },
        height: {
          base: '53px',
          xl: '61px',
        },
      },
    },
    status: {
      active: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
      },
      inactive: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
    },
  },
});

export default Button;
