import {
  createMuiTheme,
  responsiveFontSizes,
  // eslint-disable-next-line
  Theme,
} from "@material-ui/core/styles";

/**
 * App styles and colors are derived from the theme object created from this function.
 * Colors were all selected to coordinate with the primary color and text has acceptable contrast.
 *
 * @param {boolean} prefersDarkMode - Whether the user prefers a dark theme or not
 * @returns {Theme} - Theme object
 */
export default (prefersDarkMode = false) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        common: {
          black: "#303232",
          white: "#F8FAFA",
        },
        primary: {
          main: "#3DB8B6",
          light: "#77EBE8",
          dark: "#008886",
          contrastText: "#0A1F1F",
        },
        secondary: {
          main: "#A2E4E0",
          light: "#D5FFFF",
          dark: "#71B2AE",
          contrastText: "#154744",
        },
        tertiary: {
          main: "#C7F5F5",
          light: "#FBFFFF",
          dark: "#96C2C2",
          contrastText: "#0F5757",
        },
        accent: {
          main: "#F3B041",
          light: "#FFE272",
          dark: "#BC8104",
          contrastText: "#3E2804",
        },
        contrast: {
          main: "#4A5F70",
          light: "#778C9E",
          dark: "#203545",
          contrastText: "#FFFFFF",
        },
        grey: {
          50: "#F8FAFA",
          100: "#EAEEEE",
          200: "#DBE2E2",
          300: "#CAD5D5",
          400: "#B8C7C6",
          500: "#A4B7B6",
          600: "#8CA4A4",
          700: "#718F8E",
          800: "#587170",
          900: "#334242",
          A100: "#C1D2D2",
          A200: "#91A1A1",
          A400: "#2A3737",
          A700: "#718F8E",
        },
        error: {
          main: "#BA4445",
          light: "#F17470",
          dark: "#840D1E",
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#BFBF40",
          light: "#F4F171",
          dark: "#8C8F00",
          contrastText: "#424215",
        },
        success: {
          main: "#2A7C29",
          light: "#5DAC55",
          dark: "#004F00",
          contrastText: "#FFFFFF",
        },
        info: {
          main: "#3670A4",
          light: "#6B9ED6",
          dark: "#004575",
          contrastText: "#FFFFFF",
        },
        text: {
          primary: prefersDarkMode ? "#C7D6D6" : "#445A5A",
          secondary: prefersDarkMode ? "#97AFAF" : "#5B7676",
          disabled: prefersDarkMode ? "#648282" : "#89A4A4",
          hint: prefersDarkMode ? "#648282" : "#89A4A4",
        },
        divider: "#DAE2E2",
        background: {
          default: prefersDarkMode ? "#334242" : "#F8FAFA",
          paper: prefersDarkMode ? "#405454" : "#FFFFFF",
        },
        action: {
          active: prefersDarkMode ? "#A4B7B6" : "#587170",
          hover: prefersDarkMode ? "#2E3D3D" : "#EAEEEE",
          selected: prefersDarkMode ? "#3D4D4D" : "#DFE7E7",
          disabled: prefersDarkMode ? "#4F6D6D" : "#A3BDBD",
          disabledBackground: prefersDarkMode ? "#587170" : "#CAD5D5",
        },
        type: prefersDarkMode ? "dark" : "light",
      },
      shape: {
        borderRadius: 12,
      },
      spacing: [
        0,
        4,
        8,
        12,
        16,
        24,
        32,
        48,
        64,
        96,
        128,
        192,
        256,
        384,
        512,
        640,
        768,
      ],
      appBar: {
        height: 56,
      },
      navBar: {
        width: 270,
        background: prefersDarkMode ? "#405454" : "#FFFFFF",
        logoBackground: "#405454",
      },
      infoBar: {
        width: 400,
      },
      typography: {
        fontSize: 16,
        h1: {
          fontFamily: "'PT Sans Caption', sans-serif",
          fontWeight: "normal",
        },
        body1: {
          fontFamily: "'Source Sans Pro', sans-serif",
        },
        body2: {
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 20,
        },
        caption: {
          fontFamily: "'Source Sans Pro', sans-serif",
        },
      },
    }),
    {
      breakpoints: ["sm", "md", "lg", "xl"],
    }
  );
