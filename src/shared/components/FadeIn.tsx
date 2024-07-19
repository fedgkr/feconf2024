import { FC, PropsWithChildren, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { styled } from '@pigment-css/react';

interface Props {
  y?: number;
  duration?: {
    in?: number;
    out?: number;
  };
}

const FadeIn: FC<PropsWithChildren<Props>> = ({
  children,
  y = 20,
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
        y: `${y}px`,
        transition: { duration: duration?.out ?? 0.25 },
      },
    }),
    [y, duration]
  );
  return (
    <Container y={y} variants={variants} {...props}>
      {children}
    </Container>
  );
};

const Container = styled(motion.div)<{ y: number | string }>({
  opacity: 0,
  transform: ({ y }) => `translateY(${y}px)`,
});

export default FadeIn;
