import { FC, SVGProps } from 'react';

const LocationIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="marker-pin-01">
      <g id="Icon">
        <path
          d="M10.4999 10.8327C11.8806 10.8327 12.9999 9.71339 12.9999 8.33268C12.9999 6.95197 11.8806 5.83268 10.4999 5.83268C9.11921 5.83268 7.99992 6.95197 7.99992 8.33268C7.99992 9.71339 9.11921 10.8327 10.4999 10.8327Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.4999 18.3327C13.8333 14.9993 17.1666 12.0146 17.1666 8.33268C17.1666 4.65078 14.1818 1.66602 10.4999 1.66602C6.81802 1.66602 3.83325 4.65078 3.83325 8.33268C3.83325 12.0146 7.16659 14.9993 10.4999 18.3327Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

export default LocationIcon;
