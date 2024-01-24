import type { Config } from "tailwindcss"
import { Colors as colors } from "./src/themes"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        openSans: ["var(--font-open-sans)"],
        pacifico: ["var(--font-pacifico)"],
      },
      colors,
      zIndex: {
        "-1": "-1",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: ".6" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 1s ease-in-out",
      },
    },
  },
  plugins: [],
}
export default config
