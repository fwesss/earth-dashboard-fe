import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import Results from "./Results";

export default function AirQuiz() {
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
          <Results correct={correct} />
          <button type="submit" onClick={restart}>
            Retry
          </button>
        </div>
      ) : (
        <div>
          <form
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
                id="outlined-error-helper-text"
                // label={error.error}
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
                id="outlined-error-helper-text"
                // label={error.error}
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
            <button type="submit">Submit</button>
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
