import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export default (prefersDarkMode = false) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: { main: "#3db8b6" },
        secondary: { main: "#A2E4E0" },
        type: prefersDarkMode ? "dark" : "light",
      },
    }),
    {
      breakpoints: ["sm", "md", "lg", "xl"],
    }
  );
