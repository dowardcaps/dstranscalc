import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF8F3",
          card: "#FFFFFF",
          line: "#E9E4D8",
        },
        ink: {
          50: "#F1EFFC",
          100: "#E1DCF8",
          200: "#C3B9F1",
          300: "#A192E6",
          400: "#7E6BD8",
          500: "#5B45C9",
          600: "#4A37AC",
          700: "#392B87",
          800: "#2A2065",
          900: "#1C1544",
        },
        press: {
          cyan: "#0891A8",
          magenta: "#B23568",
          amber: "#B4650F",
          key: "#1C1544",
        },
        success: { DEFAULT: "#0E9764", light: "#E4F6ED" },
        danger: { DEFAULT: "#D33D3D", light: "#FBEAEA" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,21,68,0.04), 0 8px 24px -12px rgba(28,21,68,0.12)",
        pop: "0 12px 32px -8px rgba(28,21,68,0.28)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};
export default config;
