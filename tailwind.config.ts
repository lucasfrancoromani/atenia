import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: "#1A243B",
        },
        terracotta: {
          500: "#D97757",
          600: "#c26547",
        },
        gold: {
          500: "#C5A059",
        },
      },
    },
  },
  plugins: [],
};
export default config;
