import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6.6665 34.9998V26.1448M6.6665 26.1448C16.3632 18.5615 23.6365 33.7281 33.3332 26.1448V7.18814C23.6365 14.7715 16.3632 -0.39519 6.6665 7.18814V26.1448Z"
            stroke="#DC2625"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
