import type { FunctionComponent } from "react";

interface IImageProps {}

const BellIcon: FunctionComponent<IImageProps> = () => {
  return (
    <svg
      width="207"
      height="207"
      viewBox="0 0 207 207"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="103.5" cy="103.5" r="103.5" fill="#13A8D8" />
      <path
        d="M157.706 136.575L152.653 128.766C143.925 115.903 139.331 100.744 139.331 85.125C139.331 68.5875 128.306 55.2656 113.606 50.6719C112.228 46.5375 108.094 43.7812 103.5 43.7812C98.9063 43.7812 94.7719 46.5375 93.3938 50.6719C78.6938 55.2656 67.6688 68.5875 67.6688 85.125C67.6688 100.744 63.075 115.903 54.3469 128.766L49.2938 136.575C46.9969 140.25 49.2938 144.844 53.8875 144.844H153.113C157.706 144.844 160.003 140.25 157.706 136.575Z"
        stroke="white"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M121.875 144.844C121.875 154.95 113.606 163.219 103.5 163.219C93.3937 163.219 85.125 154.95 85.125 144.844"
        stroke="white"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BellIcon;
