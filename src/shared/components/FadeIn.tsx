import { FC, MouseEventHandler, PropsWithChildren, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { styled } from '@styled-system/jsx';

interface Props {
  className?: string;
  distance?: 0 | 20 | 30 | 60 | 80;
  duration?: {
    in?: number;
    out?: number;
  };
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const FadeIn: FC<PropsWithChildren<Props>> = ({
  children,
  distance = 20,
  duration,
  ...props
}) => {
  const variants: Variants = useMemo(
    () => ({
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: duration?.in ?? 0.4 },
      },
      hidden: {
        opacity: 0,
        y: `${distance}px`,
        transition: { duration: duration?.out ?? 0.25 },
      },
    }),
    [distance, duration]
  );
  return (
    <Container y={distance} variants={variants} {...props}>
      {children}
    </Container>
  );
};

const Container = styled(motion.div, {
  base: {
    opacity: 0,
  },
  variants: {
    y: {
      0: {
        transform: 'translateY(0)',
      },
      20: {
        transform: 'translateY(20px)',
      },
      30: {
        transform: 'translateY(30px)',
      },
      60: {
        transform: 'translateY(60px)',
      },
      80: {
        transform: 'translateY(80px)',
      },
    },
  },
});

export default FadeIn;
