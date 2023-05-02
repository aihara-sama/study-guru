import type { FunctionComponent } from "react";

interface IStarsIconProps {}

const StarsIcon: FunctionComponent<IStarsIconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3L14.5 8.5L21 9L16.5 14L18 20L15 18.5M12 17L6 20L7.5 14L3 9L9.5 8.5L10.6364 6"
        stroke="#5A5A5A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StarsIcon;
