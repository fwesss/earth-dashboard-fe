import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import Results from "./Results";

export default function BubblesQuiz() {
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
      givenAnswer.answer === "USA" ||
      givenAnswer.answer === "usa" ||
      givenAnswer.answer === "United States of America" ||
      givenAnswer.answer === "united states of america"
    ) {
      setResults({
        results: "correct answer",
      });
      setShowResults(true);
      setCorrect(true);
    } else {
      setError({
        error: "wrong answer",
      });
      setShowResults(true);
      setCorrect(false);
    }
  };

  const restart = () => {
    setAnswer("");
    setResults("");
    setShowResults(false);
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
      <VisTitle
        id="bubble-question-title"
        variant="h4"
        aria-label="bubble-title"
      >
        Which country has the largest number of cases?
      </VisTitle>
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
          <form noValidate autoComplete="off" onSubmit={handelSubmit}>
            <div>
              <TextField
                id="outlined-error-helper-text"
                label={results.results ? results.results : null}
                error={error.error}
                name="answer"
                type="text"
                onChange={handleChange}
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
