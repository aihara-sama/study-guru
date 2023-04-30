import type { FunctionComponent } from "react";

interface IBookIconProps {}

const BookIcon: FunctionComponent<IBookIconProps> = () => {
  return (
    <svg
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.54241 0C1.4606 6.81665e-06 1.38214 0.027093 1.32429 0.0753013C1.26644 0.123509 1.23394 0.188892 1.23393 0.257068V0.514137H0.616964C0.279877 0.514137 0 0.747367 0 1.02827V6.68378C0 6.96469 0.279877 7.19792 0.616964 7.19792H4.31875H8.02054C8.35762 7.19792 8.6375 6.96469 8.6375 6.68378V1.02827C8.6375 0.747367 8.35762 0.514137 8.02054 0.514137H7.40357V0.257068C7.40356 0.188892 7.37106 0.123509 7.31321 0.0753013C7.25536 0.027093 7.1769 6.81665e-06 7.09509 0H5.55268C5.04867 0 4.60067 0.205087 4.31875 0.519158C4.03683 0.205087 3.58883 0 3.08482 0H1.54241ZM1.85089 0.514137H3.08482C3.59959 0.514137 4.01027 0.856372 4.01027 1.28534V5.94069C3.74947 5.77256 3.43804 5.65551 3.08482 5.65551H1.85089V0.771205V0.514137ZM5.55268 0.514137H6.78661V0.771205V5.65551H5.55268C5.19946 5.65551 4.88803 5.77256 4.62723 5.94069V1.28534C4.62723 0.856372 5.03791 0.514137 5.55268 0.514137ZM0.616964 1.02827H1.23393V5.91257C1.23394 5.98075 1.26644 6.04613 1.32429 6.09434C1.38214 6.14255 1.4606 6.16964 1.54241 6.16964H3.08482C3.49099 6.16964 3.83129 6.38316 3.95725 6.68378H0.616964V1.02827ZM7.40357 1.02827H8.02054V6.68378H4.68025C4.80621 6.38316 5.14651 6.16964 5.55268 6.16964H7.09509C7.1769 6.16964 7.25536 6.14255 7.31321 6.09434C7.37106 6.04613 7.40356 5.98075 7.40357 5.91257V1.02827Z"
        fill="#13A8D8"
      />
    </svg>
  );
};

export default BookIcon;