import { FC, SVGProps } from 'react';
import { motion } from 'framer-motion';

interface Props extends SVGProps<SVGSVGElement> {}

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hidden: {
    opacity: 0,
    y: `30px`,
    transition: { duration: 0.25 },
  },
};

const ClockIcon: FC<Props> = props => {
  return (
    <motion.svg
      className={props.className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={variants}
    >
      <path
        d="M9 4.5V9L12 10.5M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="white"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default ClockIcon;
