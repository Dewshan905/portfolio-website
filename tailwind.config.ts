import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css,ts}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(59, 130, 246, 0.18), 0 0 40px rgba(37, 99, 235, 0.18)",
        premium: "0 24px 80px rgba(2, 8, 23, 0.55)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.72", transform: "scale(1.05)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
        pulseGlow: "pulseGlow 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
