import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 500,
      lineHeight: 1.18,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "2.125rem",
      lineHeight: 1.22,
    },
    h5: {
      fontSize: "2rem",
      lineHeight: 1.1,
    },
    h6: {
      fontSize: "1.75rem",
      lineHeight: 1.1,
    },
  },
  breakpoints: {
    values: {
      xl: 1440,
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        body1: "p",
      },
    },
  },
});

export default responsiveFontSizes(theme, {
  breakpoints: ["sm", "md", "lg", "xl"],
});
