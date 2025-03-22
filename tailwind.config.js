/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      "dark": "#222222", 
      "dark-light": "#191919",
      "radix-green": "#30a46c",
      "radix-grass": "#46a758"
      },
      fontFamily: {
        primary: ["Nunito"],
        lora: ["lora", "serif"],
      },
    },
  },
  plugins: [],
};
