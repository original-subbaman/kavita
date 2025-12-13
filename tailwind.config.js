/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-cover': "url('/src/assets/cover.png')",
      }, 
      keyframes: {
        widthGrow: {
          '0%': { width: "0%"},
          '100%': { width: '40%'}
        },
        fadePulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
      },
      animation: {
        'width-grow': 'widthGrow 0.3s ease-out forwards', 
        'fade-pulse': 'fadePulse 2s ease-in-out infinite',
        'blink': 'blink 1.5s step-end infinite',
      },
      colors: {
      "dark": "#222222", 
      "dark-light": "#191919",
      "radix-green": "#30a46c",
      "radix-grass": "#46a758",
      "brownish-dark": "#2e2b29",
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
