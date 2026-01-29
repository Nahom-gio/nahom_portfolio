import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        panel: "rgba(24, 24, 27, 0.72)",
        border: "rgba(63, 63, 70, 0.65)",
        glow: "rgba(56, 189, 248, 0.25)",
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(63, 63, 70, 0.6), 0 20px 40px rgba(0, 0, 0, 0.45)",
        glow: "0 0 20px rgba(56, 189, 248, 0.25)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
