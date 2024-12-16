import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          muted: "var(--background-muted)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          muted: "var(--primary-muted)",
        },
        green: {
          DEFAULT: "var(--green)",
          muted: "var(--green-muted)",
        },
        red: {
          DEFAULT: "var(--red)",
          muted: "var(--red-muted)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
