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
            d="M5 20C5 21.9698 5.38799 23.9204 6.14181 25.7403C6.89563 27.5601 8.00052 29.2137 9.3934 30.6066C10.7863 31.9995 12.4399 33.1044 14.2597 33.8582C16.0796 34.612 18.0302 35 20 35C21.9698 35 23.9204 34.612 25.7403 33.8582C27.5601 33.1044 29.2137 31.9995 30.6066 30.6066C31.9995 29.2137 33.1044 27.5601 33.8582 25.7403C34.612 23.9204 35 21.9698 35 20C35 16.0218 33.4196 12.2064 30.6066 9.3934C27.7936 6.58035 23.9782 5 20 5C16.0218 5 12.2064 6.58035 9.3934 9.3934C6.58035 12.2064 5 16.0218 5 20Z"
            stroke="#F97316"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 11.6665V19.9998L25 24.9998"
            stroke="#F97316"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
