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
    },
  },
  plugins: [],
});
