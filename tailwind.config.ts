import type { Config } from "tailwindcss";

// #e2e8f0
// #ffcbca
// #ffd6aa
// #fff08b
// #d9f89c
// #bfdaff
// #fbcee9
// #ddd7ff


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      bebas: ["var(--font-bebas)"],
    },
    extend: {
      colors: {
        color1 : "#e2e8f0",
        color2 : "#ffcbca",
        color3 : "#ffd6aa",
        color4 : "#fff08b",
        color5 : "#d9f89c",
        color6 : "#bfdaff",
        color7 : "#fbcee9",
        color8 : "#ddd7ff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
export default config;
