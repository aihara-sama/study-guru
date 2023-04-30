import type { FunctionComponent } from "react";

interface IPencilIconProps {}

const PencilIcon: FunctionComponent<IPencilIconProps> = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.55246 0.255726C8.21253 -0.08479 7.65802 -0.0853681 7.31575 0.255726L6.10645 1.46503L0.608028 6.96404L0.000461578 10.0001L3.03654 9.39255L7.98513 4.44456L7.57289 4.03232L3.39689 8.20774L1.79284 6.60369L6.51869 1.87727L8.53556 3.89413L9.74486 2.68483C10.0854 2.34315 10.0854 1.78864 9.74486 1.44812L8.55246 0.255726ZM1.38061 7.01593L2.98465 8.61998L2.74967 8.85495L0.744467 9.25612L1.14563 7.25091L1.38061 7.01593ZM6.48277 3.10563L2.87702 6.71138L3.28925 7.12362L6.895 3.51787L6.48277 3.10563ZM7.9344 0.58283C8.00903 0.58283 8.08308 0.610819 8.14023 0.66796L9.33262 1.86036C9.44574 1.97347 9.44574 2.15889 9.33262 2.27259L8.53555 3.06966L6.93092 1.46502L7.72799 0.66796C7.78513 0.610819 7.85976 0.58283 7.93439 0.58283H7.9344Z"
        fill="#5A5A5A"
      />
    </svg>
  );
};

export default PencilIcon;