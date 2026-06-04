import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light editorial palette — deep navy ink on warm off-white paper
        paper: {
          50: "#fbfaf7", // canvas
          100: "#f4f2ec", // subtle surface
          200: "#e9e5dc", // hairline border
        },
        ink: {
          900: "#0f1623", // primary text
          800: "#1f2a3d",
          700: "#3a4660",
          500: "#6b7488", // secondary text
          400: "#9aa1b2", // muted
        },
        brand: {
          50: "#eef4ff",
          100: "#d9e7ff",
          400: "#5b8def",
          500: "#2f6bff",
          600: "#1d4fd7",
          700: "#1740a8",
        },
        accent: {
          400: "#ffb547",
          500: "#ff8a00",
          600: "#d96f00",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -12px rgba(47, 107, 255, 0.35)",
        soft: "0 1px 2px rgba(15, 22, 35, 0.04), 0 8px 24px -12px rgba(15, 22, 35, 0.12)",
        ring: "0 0 0 1px rgba(15, 22, 35, 0.06), 0 12px 32px -16px rgba(15, 22, 35, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
