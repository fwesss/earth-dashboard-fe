import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import theme from "../theme";
import { ReactComponent as Error } from "./error.svg";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, type } = this.props;

    if (hasError) {
      if (type === "visualization") {
        // You can render any custom fallback UI
        return (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="95%"
            mx="auto"
            py={5}
            my={5}
            bgcolor={theme.palette.error.light}
          >
            <Typography
              variant="h2"
              component="span"
              color={theme.palette.error.contrastText}
              gutterBottom
            >
              Something went wrong with this visualization!
            </Typography>
            <Error width="80%" />
          </Box>
        );
      }
      return <p>Something went wrong!</p>;
    }
    return children;
  }
}

export default ErrorBoundary;
