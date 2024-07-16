import { FC, SVGProps } from 'react';

const ArrowIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="8"
    height="15"
    viewBox="0 0 8 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.625002 0.791707L7.33333 7.50004L0.625 14.2084"
      stroke="white"
      strokeOpacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
