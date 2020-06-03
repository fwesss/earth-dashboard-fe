import React from "react";
import { Box, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

export default ({ dataset, children }) => {
  const theme = useTheme();

  return (
    <Box
      position="absolute"
      right={theme.spacing(6)}
      bottom={theme.spacing(6)}
      zIndex={1}
      maxWidth={500}
    >
      <Card raised>
        <CardHeader title={dataset} />
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
