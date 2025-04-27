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
            d="M30.0002 10L11.6668 28.3333L3.3335 20"
            stroke="#22C55E"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M36.6665 16.6665L24.1665 29.1665L21.6665 26.6665"
            stroke="#22C55E"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
