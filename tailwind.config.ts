import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#05080D",
          deep: "#020407",
          card: "#080F16",
        },
        gunmetal: {
          DEFAULT: "#10202B",
          surface: "#0D1A23",
          high: "#152A38",
          border: "#1C3546",
        },
        cyan: {
          DEFAULT: "#48DDF5",
          bright: "#68E7FC",
          glow: "rgba(72, 221, 245, 0.4)",
          dim: "rgba(72, 221, 245, 0.12)",
          subtle: "rgba(72, 221, 245, 0.05)",
        },
        amber: {
          DEFAULT: "#F3AE50",
          bright: "#FFC266",
          glow: "rgba(243, 174, 80, 0.4)",
          dim: "rgba(243, 174, 80, 0.15)",
        },
        ice: {
          DEFAULT: "#DCE8F1",
          muted: "rgba(220, 232, 241, 0.65)",
          faint: "rgba(220, 232, 241, 0.35)",
        },
        stark: {
          red: "#FF4C6A",
          green: "#00F5A0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "hud-cyan": "0 0 15px rgba(72, 221, 245, 0.25)",
        "hud-amber": "0 0 15px rgba(243, 174, 80, 0.25)",
        "panel-inner": "inset 0 0 12px rgba(72, 221, 245, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "reverse-spin": "spin 25s linear infinite reverse",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
