import type { FunctionComponent } from "react";

interface ITrashIconProps {
  onClick?: () => void;
}

const TrashIcon: FunctionComponent<ITrashIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="12"
      height="12"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10_737)">
        <path
          d="M9.61539 1.53846H7.30769V0.384615C7.30769 0.282609 7.26717 0.184781 7.19504 0.112651C7.12291 0.0405219 7.02508 0 6.92308 0L3.07692 0C2.97492 0 2.87709 0.0405219 2.80496 0.112651C2.73283 0.184781 2.69231 0.282609 2.69231 0.384615V1.53846H0.384615C0.282609 1.53846 0.184781 1.57898 0.112651 1.65111C0.0405219 1.72324 0 1.82107 0 1.92308C0 2.02508 0.0405219 2.12291 0.112651 2.19504C0.184781 2.26717 0.282609 2.30769 0.384615 2.30769H1.73077V9.61539C1.73077 9.71739 1.77129 9.81522 1.84342 9.88735C1.91555 9.95948 2.01338 10 2.11538 10H7.88462C7.98662 10 8.08445 9.95948 8.15658 9.88735C8.22871 9.81522 8.26923 9.71739 8.26923 9.61539V2.30769H9.61539C9.71739 2.30769 9.81522 2.26717 9.88735 2.19504C9.95948 2.12291 10 2.02508 10 1.92308C10 1.82107 9.95948 1.72324 9.88735 1.65111C9.81522 1.57898 9.71739 1.53846 9.61539 1.53846ZM3.46154 0.769231H6.53846V1.53846H3.46154V0.769231ZM7.5 9.23077H2.5V2.30769H7.5V9.23077Z"
          fill="#5A5A5A"
        />
        <path
          d="M5.00009 2.77881C4.89809 2.77881 4.80026 2.81933 4.72813 2.89146C4.656 2.96359 4.61548 3.06142 4.61548 3.16342V8.63265C4.61548 8.73466 4.656 8.83249 4.72813 8.90462C4.80026 8.97675 4.89809 9.01727 5.00009 9.01727C5.1021 9.01727 5.19993 8.97675 5.27206 8.90462C5.34419 8.83249 5.38471 8.73466 5.38471 8.63265V3.16342C5.38471 3.06142 5.34419 2.96359 5.27206 2.89146C5.19993 2.81933 5.1021 2.77881 5.00009 2.77881Z"
          fill="#5A5A5A"
        />
        <path
          d="M6.45395 2.77881C6.35195 2.77881 6.25412 2.81933 6.18199 2.89146C6.10986 2.96359 6.06934 3.06142 6.06934 3.16342V8.63265C6.06934 8.73466 6.10986 8.83249 6.18199 8.90462C6.25412 8.97675 6.35195 9.01727 6.45395 9.01727C6.55596 9.01727 6.65379 8.97675 6.72592 8.90462C6.79804 8.83249 6.83857 8.73466 6.83857 8.63265V3.16342C6.83857 3.06142 6.79804 2.96359 6.72592 2.89146C6.65379 2.81933 6.55596 2.77881 6.45395 2.77881Z"
          fill="#5A5A5A"
        />
        <path
          d="M3.54624 2.77881C3.44423 2.77881 3.3464 2.81933 3.27427 2.89146C3.20214 2.96359 3.16162 3.06142 3.16162 3.16342V8.63265C3.16162 8.73466 3.20214 8.83249 3.27427 8.90462C3.3464 8.97675 3.44423 9.01727 3.54624 9.01727C3.64824 9.01727 3.74607 8.97675 3.8182 8.90462C3.89033 8.83249 3.93085 8.73466 3.93085 8.63265V3.16342C3.93085 3.06142 3.89033 2.96359 3.8182 2.89146C3.74607 2.81933 3.64824 2.77881 3.54624 2.77881Z"
          fill="#5A5A5A"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_737">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TrashIcon;
