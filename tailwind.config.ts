import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f8fc",
        ink: "#172033",
        navy: "#14213d",
        brand: { 50: "#eff5ff", 100: "#dbeafe", 500: "#2563eb", 600: "#1d4ed8", 700: "#1e40af" },
      },
      boxShadow: { panel: "0 1px 3px rgba(15, 23, 42, .05), 0 12px 28px rgba(15, 23, 42, .06)" },
    },
  },
  plugins: [],
};

export default config;
