import type { FunctionComponent } from "react";

interface ICheckIconProps {
  onClick?: () => void;
}

const CheckIcon: FunctionComponent<ICheckIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1312 1.36689L13.9183 0L8.46452 6.14616L9.67742 7.51305L15.1312 1.36689ZM18.7785 0L9.67742 10.2565L6.08172 6.21402L4.86882 7.58091L9.67742 13L20 1.36689L18.7785 0ZM0 7.58091L4.8086 13L6.02151 11.6331L1.22151 6.21402L0 7.58091Z"
        fill="black"
      />
    </svg>
  );
};

export default CheckIcon;
