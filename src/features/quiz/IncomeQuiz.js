import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import VisTitle from "../visualizations/VisTitle";

const useStyles = makeStyles({
  inputField: {
    width: 100,
  },
});

export default function BubblesQuiz() {
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
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted', answer)
    validationSchema(answer);
  };

  return (
    <Box
      id="bubble-question"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="30vh"
      alignItems="center"
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
          <form noValidate autoComplete="off" onSubmit={handelSubmit}>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label={results.results ? results.results : null}
                error={error.error}
                name="answer"
                type="text"
                onChange={handleChange}
                multiline
                rows={2}
                defaultValue="Answer Question here"
                value={answer.answer}
                variant="outlined"
                // required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </Box>
  );
}
