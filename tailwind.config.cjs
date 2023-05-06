/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        moveIt: {
          "0%": { "background-position": "top  " },
          "50%": { "background-position": "bottom  " },
          "100%": { "background-position": "top  " },
        },

        dash: {
          "0%": { "stroke-dasharray": "1, 150", "stroke-dashoffset": "0" },
          "50%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": "-35" },
          "100%": {
            "stroke-dasharray": "90, 150",
            "stroke-dashoffset": "-124",
          },
        },
        customePulse: {
          "0%": { opacity: ".3" },
          "50%": { opacity: ".5" },
          "100%": { opacity: "1" },
        },
        vanishPulse: {
          "0%": { opacity: "1", "background-color": "#191919" },
          "50%": { opacity: ".8", "background-color": "#EB6440" },
          "100%": { opacity: "1", "background-color": "#191919" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        slowSpin: "spin 2s linear infinite",
        slowSpinEase: "spin 1s  linear infinite",
        slowSpinOnce: "spin 0.6s ease-in-out ",
        movingbg: "moveIt 100s linear infinite",
        dash: "dash 1.5s ease-in-out infinite",
        pulseOnce: "customePulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) 1 ",
        bounceAndVanish: "bounce 1s 3",
        pulseAndVanish: "vanishPulse 1s cubic-bezier(0.4, 0, 0.6, 1) 3 ",
      },
      colors: {
        ...colors,
        dark: "#191919",
        primary: "#20262E",
        secondary: "#DDDDDD",
        light: "#EEEEEE",
        accent: "#EB6440",
        "badge-1": "#FF4D4D",
        "badge-2": "#D9D900",
        "badge-3": "#00FF00",
        "badge-4": "#00FAF2",
        "badge-5": "#0000FF",
        "badge-6": "#C40202",
        "badge-7": "#969600",
        "badge-8": "#009C00",
        "badge-9": "#00B8B2",
        "badge-10": "#000091",
        "badge-11": "#590101",
        "badge-12": "#474700",
        "badge-13": "#003600",
        "badge-14": "#006965",
        "badge-15": "#3B1754",
        "badge-16": "#E600FF",
        "badge-17": "#8F009E",
        "badge-18": "#6B6A4E",
        "badge-19": "#24272B",
        "badge-20": "#FF1493",
      },
      backgroundImage: {
        "background-image": "url('/src/assets/bg.svg')",
      },
      fontFamily: {
        openSans: ["OpenSans", "sans-serif"],
        "openSans-bold": ["OpenSans-bold", "sans-serif"],
        "openSans-light": ["OpenSans-light", "sans-serif"],
        "openSans-medium": ["OpenSans-medium", "sans-serif"],
        "Times-New-Roman": ["Times New Roman", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
