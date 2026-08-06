import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F3F6FC",
          card: "#FFFFFF",
          line: "#D0E0F0",
        },
        ink: {
          50: "#EEF4FB",
          100: "#D6E6F7",
          200: "#AECDEF",
          300: "#7FB3E5",
          400: "#4F96D8",
          500: "#2B7CD3",
          600: "#1A5FAB",
          700: "#164F8E",
          800: "#103A6A",
          900: "#0A2647",
        },
        press: {
          cyan: "#0078D4",
          magenta: "#106EBE",
          amber: "#005A9E",
          key: "#0A2647",
        },
        success: { DEFAULT: "#107C10", light: "#DFF6DD" },
        danger: { DEFAULT: "#C42B1C", light: "#FDE7E9" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,38,71,0.04), 0 8px 24px -12px rgba(10,38,71,0.12)",
        pop: "0 12px 32px -8px rgba(10,38,71,0.28)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};
export default config;
