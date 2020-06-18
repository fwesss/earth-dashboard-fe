import React, { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import Results from "./Results";

export default function CountryQuiz() {
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
            givenAnswer.answer === "India" ||
            givenAnswer.answer === "india"
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
            givenAnswerTwo.answer === "Cambodia" ||
            givenAnswerTwo.answer === "cambodia"
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
                                    Which of these countries had the largest increase in % change
                                    from 1990 - 2018?
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
                                        Which of these countries had the largest decrease in % change
                                        from 2019 - 2120?
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
