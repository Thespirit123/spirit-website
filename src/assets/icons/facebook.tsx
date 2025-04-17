const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={19}
    height={20}
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.4583 2.08337H11.0833C10.0335 2.08337 9.0267 2.50041 8.28437 3.24274C7.54204 3.98507 7.125 4.99189 7.125 6.04171V8.41671H4.75V11.5834H7.125V17.9167H10.2917V11.5834H12.6667L13.4583 8.41671H10.2917V6.04171C10.2917 5.83174 10.3751 5.63038 10.5235 5.48191C10.672 5.33345 10.8734 5.25004 11.0833 5.25004H13.4583V2.08337Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
