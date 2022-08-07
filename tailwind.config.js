/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#5F6AC4",
        "main-red": "#E56C7E",
        "sec-blue": "#F5F7FB",
        "sec-red": "#FEF7F9",
        "third-blue": "#D7DBF0",
        "third-red": "#F6E3E7",
        "fourth-blue": "#49529B",
        "fourth-red": "#B94859",
      },
      dropShadow: {
        main: "0 10px 40px rgba(0,0,0,0.07)",
        sec: "0 8px 40px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        main: "30px",
      },
    },
  },
  plugins: [],
};
