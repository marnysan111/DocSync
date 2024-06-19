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
        'custom-gray': '#E0E0E0',
        'custom-dark-gray': '#333333',
        'custom-light-gray': '#666666',
      },
    },
  },
  plugins: [],
};
export default config;
