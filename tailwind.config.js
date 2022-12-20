
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        screens: {
            xxs: "380px",
          },
        fontFamily: {
            MontserratBold: ['Montserrat Bold'],
            MontserratRegular: ['Montserrat Regular'],
            MontserratSemiBold: ['Montserrat SemiBold'],
            MontserratMedium: ['Montserrat Medium'],
            MontserratRegular: ['Montserrat Regular']
        },
        boxShadow: {
            'shadow1': '0px 0px 24px 10px #c5c5c538',
          }

    },
  },
  plugins: [],
}
