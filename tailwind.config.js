const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
                  colors: {
        primary: "#000080",   
        secondary: "#FFD700", 
        accent: "#F8FAFC",
      },
        screens: {
        xs: "360px",   // small phones
        sm: "640px",   // default
        md: "768px",   // tablets
        lg: "1024px",  // laptops
        xl: "1280px",  // desktops
        "2xl": "1536px", // large screens
      },
            maxWidth: {
        "8xl": "90rem",    // 1440px
        "9xl": "100rem",   // 1600px
        "10xl": "120rem",  // 1920px
        "11xl": "140rem",  // 2240px
      },
    },
  },
  plugins: [],
});
