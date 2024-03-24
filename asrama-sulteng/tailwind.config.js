const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeAsrama: "#FF6B00",
        abuAbu: "#F7F7F7",
        orangeAsrama2: "#FF964A",
      },
    },
  },
  plugins: [],
});
