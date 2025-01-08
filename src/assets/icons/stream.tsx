import * as React from "react";
const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={16}
    height={18}
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.89 9.84597C14.537 11.189 12.867 12.138 9.526 14.036C6.296 15.871 4.681 16.788 3.38 16.42C2.84076 16.2671 2.35021 15.9774 1.956 15.579C1 14.614 1 12.743 1 8.99997C1 5.25697 1 3.38597 1.956 2.42097C2.35032 2.0229 2.84086 1.73354 3.38 1.58097C4.681 1.21097 6.296 2.12897 9.526 3.96397C12.866 5.86197 14.537 6.81097 14.891 8.15397C15.038 8.70839 15.038 9.29156 14.891 9.84597"
      stroke="#21B7D2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
