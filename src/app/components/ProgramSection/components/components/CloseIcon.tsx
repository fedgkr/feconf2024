import { FC, SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

const CloseIcon: FC<Props> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#A8ACC0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
