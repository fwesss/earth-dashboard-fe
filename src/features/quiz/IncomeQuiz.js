/* eslint-disable */

import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import VisTitle from "../visualizations/VisTitle";
import { useDispatch } from "react-redux";
import { incrementProgress } from "./quizProgressSlice";

const useStyles = makeStyles({
  input: {
    width: "100%",
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginLeft: "2rem",
  },
});

export default function BubblesQuiz() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [correct, setCorrect] = useState();

  const handleChange = (e) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  const validationSchema = (givenAnswer) => {
    if (givenAnswer.answer === "") {
      setError({
        error: "Required",
      });
    } else if (givenAnswer.answer) {
      setResults({
        results: "correct answer",
      });
      setShowResults(true);
      setCorrect(true);
      dispatch(incrementProgress("income"));
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    validationSchema(answer);
  };

  return (
    <Box
      id="bubble-question"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="50vh"
      alignItems="center"
      data-testid="vis-quiz"
    >
      {showResults ? (
        // results page
        <div>
          <h1>Thank you for your answer</h1>
        </div>
      ) : (
        <div>
          <div>
            <VisTitle
              id="bubble-question-title"
              variant="h4"
              aria-label="bubble-title"
            >
              Why do you think lower-income countries trends are the opposite
              than higher-income countries?
            </VisTitle>
          </div>
          <form
            noValidate
            className={classes.form}
            autoComplete="off"
            onSubmit={handelSubmit}
          >
            <Box style={{ width: "50%" }}>
              <TextField
                className={classes.input}
                id="outlined-error-helper-text"
                label={results.results ? results.results : null}
                error={error.error}
                name="answer"
                type="text"
                onChange={handleChange}
                multiline
                rows={2}
                defaultValue="Your opinion here"
                value={answer.answer}
                variant="outlined"
                // required
              />
            </Box>
            <Button
              className={classes.button}
              height="20%"
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </Box>
  );
}
