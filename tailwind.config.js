/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        widthGrow: {
          '0%': { width: "0%"},
          '100%': { width: '40%'}
        }
      },
      animation: {
        'width-grow': 'widthGrow 0.3s ease-out forwards' 
      },
      colors: {
      "dark": "#222222", 
      "dark-light": "#191919",
      "radix-green": "#30a46c",
      "radix-grass": "#46a758",
      "aurora": "#00141a",
      "ice-berg-dark": "#161821"
      },
      fontFamily: {
        primary: ["Nunito"],
        lora: ["lora", "serif"],
        cal_sans: ["Cal Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
