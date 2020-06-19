/* eslint-disable */

import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisTitle from "../visualizations/VisTitle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  input: {
    width: "100%",
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "20%",
  },
});

export default function AirQuiz() {
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
    } else if (
      givenAnswer.answer === "36" ||
      givenAnswer.answer === "37" ||
      givenAnswer.answer === "38"
    ) {
      setResults({
        results: "correct answer",
      });
      setShowResults(true);
      setCorrect(true);
    } else {
      setShowResults(true);
      setCorrect(false);
    }
  };

  const validationSchemaTwo = (givenAnswerTwo) => {
    if (givenAnswerTwo.answer === "") {
      setError({
        error: "Required",
      });
    } else if (
      givenAnswerTwo.answer === "15" ||
      givenAnswerTwo.answer === "16"
    ) {
      setResults({
        results: "correct answer",
      });
      setShowResults(true);
      setCorrect(true);
    } else {
      setShowResults(true);
      setCorrect(false);
    }
  };

  const restart = () => {
    setAnswer("");
    setResults("");
    setShowResults(false);
  };

  const handelSubmit = (e, question) => {
    e.preventDefault();
    // console.log('submitted', answer)
    if (question === 1) {
      validationSchema(answer);
    } else {
      validationSchemaTwo(answer);
    }
  };

  return (
    <Box
      id="Air-question"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="70vh"
      alignItems="center"
    >
      {showResults ? (
        // results page
        <Box
          className="container-results"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "82%",
          }}
        >
          <Box className="answer-results">
            <>
              {correct ? (
                <div
                  className="correct-answer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="correct-answer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VisTitle
                      id="bubble-question-title"
                      variant="h4"
                      aria-label="bubble-title"
                    >
                      Where did air pollution peak on January 26th?
                    </VisTitle>
                    <h1>Correct</h1>
                    <CheckCircleIcon style={{ color: green[500] }} />
                  </div>
                  <div
                    className="correct-answer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VisTitle
                      id="bubble-question-title"
                      variant="h4"
                      aria-label="bubble-title"
                    >
                      Where did air pollution peak on January 26th?
                    </VisTitle>
                    <h1>Correct</h1>
                    <CheckCircleIcon style={{ color: green[500] }} />
                  </div>
                </div>
              ) : (
                <div
                  className="wrong-answer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>Failed</h1>
                  <HighlightOffIcon style={{ color: red[500] }} />
                </div>
              )}
            </>
          </Box>
          <Button
            style={{ width: "20%" }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={restart}
          >
            Retry
          </Button>
        </Box>
      ) : (
        <div>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handelSubmit(e, 1)}
          >
            <div>
              <VisTitle
                id="bubble-question-title"
                variant="h4"
                aria-label="bubble-title"
              >
                Where did air pollution peak on January 26th?
              </VisTitle>
            </div>
            <div>
              <TextField
                className={classes.input}
                id="outlined-error-helper-text"
                error={error.error ? error.error : null}
                name="answer"
                type="text"
                onChange={handleChange}
                // defaultValue="Answer Question here"
                value={answer.answer}
                variant="outlined"
                // required
              />
              <div>
                <VisTitle
                  id="bubble-question-title"
                  variant="h4"
                  aria-label="bubble-title"
                >
                  What was the highest level of air pollution during lockdown?
                </VisTitle>
              </div>

              <TextField
                className={classes.input}
                id="outlined-error-helper-text"
                error={error.error ? error.error : null}
                name="answer-two"
                type="text"
                onChange={handleChange}
                // defaultValue="Answer Question here"
                value={answer.answerTwp}
                variant="outlined"
                // required
              />
            </div>
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

// <div> styling
// width: 100%;
// height: 30vh;
// display: flex;
// justify - content: center;
// align - items: center;

// <form> styling
// display: flex;
// flex-direction: column;
// width: 100%;
// justify-content: center;
// align-items: center;
// height: 100%;

// <input> styling
// width: 50%;
// height: 20%;
// border-radius: 0.35rem;

// <button> styling
// height: 3rem;
// width: 7rem;
