module.exports = {
  purge: [
    "./src/**/*.js",
    "./pages/**/*.js",
      "./components/**/*.js",
      "./plugins/**/*.js",
      "./static/**/*.js",
      "./store/**/*.js"
],
  important: true,
  darkMode: false, // or 'media' or 'class'
  
  theme: {
    extend: {
      backgroundImage: {
        'scholarBanner': "url('./assets/images/scholarBanner.png')",
        'scholarBannerMobile': "url('./assets/images/scholarBannerMobile.png')",
        'scholarBannerTab': "url('./assets/images/scholarBannerTab.png')",
        'mentorHubBanner': "url('./assets/images/mentorHubBanner.png')",
        'mentorHubBannerIPad': "url('./assets/images/mentorHubBannerIPad.png')",
        'mentorHubBannerIPhone': "url('./assets/images/mentorHubBannerIPhone.png')",
        'solutionsBanner': "url('./assets/images/images/solutions/solutionsBanner.png')",
        'solutionsBanneriPad': "url('./assets/images/images/solutions/solutionsBanneriPad.png')",
        'solutionsBannerMobile': "url('./assets/images/images/solutions/solutionsBannerMobile.png')",
        'solutionsInformation': "url('./assets/images/images/solutions/information.png')",
        'solutionsInformationiPad': "url('./assets/images/images/solutions/informationiPad.png')",
        'solutionsInformationMobile': "url('./assets/images/images/solutions/informationMobile.png')",
        'aboutUsDesktop': "url('./assets/images/images/about-us/aboutBanner.png')",
        'mobileDesktopBanner': "url('./assets/images/images/mobile/mobile-desktop-banner.png')",
        'mobileiPadBanner': "url('./assets/images/images/mobile/mobile-iPad-banner.png')",
        'mobileBanner': "url('./assets/images/images/mobile/mobile-banner.png')",
        'mobileWholeBg': "url('./assets/images/images/mobile/mobile-whole-bg.png')",
        'mobilePushNotification': "url('./assets/images/images/mobile/push-notification.png')",
        'mobileDarkTheme': "url('./assets/images/images/mobile/dark-theme.png')",
        'mobileStories': "url('./assets/images/images/mobile/stories.png')",
      },
      screens: {
        '3xl': "1900px",
        'sl' : "1366px",
      },
      transform: {
        180: "rotate(180deg)",
      },
      boxShadow: {
        "3xl": "rgba(0, 0, 0, 0.20) 0px 4px 6px",
        "4xl": "0px 3px 26px #00000029",
        "5xl": "0px 3px 20px #00000029",
        "6xl": "0px 20px 20px #DCDEE98A",
        "7xl": "0px 3px 60px #00000029",
        "8xl": "0px 3px 25px #0000000A",
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      fontSize: {
        xs2: "0.688rem",
        xl2: "16px",
        "18px": "18px",
        xl3: "22px",
        Xll: "1.75rem",
      },
      colors: {
        pinkInvolv: {
          100: "#FFF1FB",
          500: "#FF59CF",
        },
        blackInvolv: {
          300: "#333333",
          900: "#2C3652",
        },
        slate: {
          300: "#e2e8f3",
          200: "#BFBFBF",
        },
        grayInvolv: {
          200: "#70707099",
          300: "#E2E8F3",
          500: "#777777",
          600: "#8B91A9",
          800: "#666666",
          900: "#2C3652",
        },
        greenInvolv: {
          300: "#09B29B",
          400: "#44CC82",
        },
        indigo: {
          700: "#623EDA",
          800: "#391E94",
          900: "#3246D3",
          1200: "#2C3651",
        },
        red: {
          300: "#DC5161",
          400: '#E0515E'
        },
        violet: {
          100: "#F7F7FF",
          900: "#6C5AFE",
        },
        blueInvolv: {
          100: "#F6F5FF",
          300: "#8A72FF",
          600: "#3246D3",
          700: "#3246D3",
          800: "#2C3652",
          900: "#B6BFFF",
        },
      },

      maxHeight: {
        "2/3": "66.666667%",
        "3/4": "75%",
        200: "127px",
        300: "400px",
        400: "400px",
        500: "500px",
        572: "500px",
      },
      minHeight: {
        "2/3": "66.666667%",
        "3/4": "75%",
        300: "400px",
        400: "400px",
        500: "500px",
        572: "500px",
      },
      maxWidth: {
        "2/3": "66.666667%",
        "3/4": "75%",
        500: "500px",
      },
      minWidth: {
        "3/4": "75%",
        "2/3": "66.666667%",
        500: "500px",
      },
      width: {
        300: "300px",
        400: "400px",
        500: "500px",
        650: "650px",
        1313: "1313px",
        263: "263px",
        270: "270px",
        813: "813px",
        85: "85%",
        89: "89%",
        13: "13px",
        "27px": "27px",
        4.5: "18px",
      },
      height: {
        127: "127px",
        350: "350px",
        658: "658px",
        50: "50px",
        813: "813px",
        1.3: "5px",
      },
      borderWidth: {
        30: "30px",
      },
      borderRadius: {
        xl4: "30px",
      },
      borderColor: {
        branding: "#2C3652",
      },
    },
  },
  variants: {
    extend: {
      borderRight: ["hover"],
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("tailwindcss-pseudo-elements"),
  ],
};
