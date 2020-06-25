import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { visualizations } from "../visualizations/visConstructor";

const numberOfQuestions = visualizations.length;

export default () => {
  const { darkMode } = useSelector((state) => state.themeReducer);
  const { progress } = useSelector((state) => state.quizProgressReducer);

  return (
    <Box display="flex" flexDirection="column" width="100%" mx={3}>
      <Typography>{`Progress ${
        (progress * 100) / numberOfQuestions
      }%`}</Typography>
      <LinearProgress
        variant="determinate"
        value={(progress * 100) / numberOfQuestions}
        color={darkMode ? "secondary" : "primary"}
      />
    </Box>
  );
};
