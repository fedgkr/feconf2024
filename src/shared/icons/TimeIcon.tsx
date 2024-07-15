import { FC, SVGProps } from 'react';

const TimeIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="clock">
      <path
        id="Icon"
        d="M10.4998 4.99935V9.99935L13.8332 11.666M18.8332 9.99935C18.8332 14.6017 15.1022 18.3327 10.4998 18.3327C5.89746 18.3327 2.1665 14.6017 2.1665 9.99935C2.1665 5.39698 5.89746 1.66602 10.4998 1.66602C15.1022 1.66602 18.8332 5.39698 18.8332 9.99935Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default TimeIcon;
