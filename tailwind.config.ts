import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#008EA8",
          "primary-dark": "#007A91",
          "primary-light": "#00A9C9",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
