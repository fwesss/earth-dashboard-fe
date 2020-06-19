import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import { ReactComponent as Error } from "./error.svg";

/**
 * withErrorBoundary is an HOC that can be wrapped around any component. If an error is thrown within the wrapped component or
 * its children, we will display an error message and friendly illustration in place of the broken component.
 *
 * This HOC should be wrapped around any component that can fail. A good candidate would be any component that performs a call
 * to an API. If the API returns different data or an error response, the broken component will be switched out with the fallback
 * illustration or message and the rest of the app will function normally.
 *
 * @param {Component} WrappedComponent - The component to be wrapped in the ErrorBoundary
 * @param {string} type - The error displayed will depend on the type. "Visualization" will result in an illustration showing the user something broke.
 * @returns {*} - The component displaying the error
 */
const withErrorBoundary = (WrappedComponent, type) =>
  class ErrorBoundary extends Component {
    /**
     *
     * @param {any} props - Component props
     */
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    /**
     * Update state so the next render will show the fallback UI.
     *
     * @returns {{hasError: boolean}} - Updated state
     */
    static getDerivedStateFromError() {
      return { hasError: true };
    }

    /**
     * Component to be rendered by ErrorBoundary
     *
     * @returns {Component} - The component to render
     */
    render() {
      const { hasError } = this.state;

      if (hasError) {
        if (type === "visualization") {
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
            >
              <Typography variant="h2" component="span" gutterBottom>
                Something went wrong with this visualization!
              </Typography>
              <Error width="80%" />
            </Box>
          );
        }
        return <p>Something went wrong!</p>;
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...this.props} />;
    }
  };

export default withErrorBoundary;
