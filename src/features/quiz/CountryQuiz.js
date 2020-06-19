import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisTitle from "../visualizations/VisTitle";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { green, red } from '@material-ui/core/colors';


const useStyles = makeStyles({
    input: {
        width: '100%',
        marginBottom: '2rem',
        marginTop: '2rem'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '20%'
    }
})

export default function CountryQuiz() {
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
            height="60vh"
            alignItems="center"
        >
            {showResults ? (
                // results page
                <Box className='container-results' style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', width: '82%' }}>
                    <Box className='answer-results' style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: '82%' }}>
                        <>
                            {correct ? (
                                <div className="correct-answer" style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                                    <div className="correct-answer" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        <VisTitle
                                            id="bubble-question-title"
                                            variant="h5"
                                            aria-label="bubble-title"
                                        >
                                            Which of these countries had the largest increase in % change
                                              from 1990 - 2018?
                                    </VisTitle><h1>Correct</h1>
                                        <CheckCircleIcon style={{ color: green[500] }} />
                                    </div>
                                    <div className="correct-answer" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        <VisTitle
                                            id="bubble-question-title"
                                            variant="h5"
                                            aria-label="bubble-title"
                                        >
                                            Which of these countries had the largest decrease in % change
                                              from 2019 - 2120?
                                    </VisTitle><h1>Correct</h1>
                                        <CheckCircleIcon style={{ color: green[500] }} />
                                    </div>
                                </div>
                            ) : (
                                    <div className="wrong-answer" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        <h1>Failed</h1>
                                        <HighlightOffIcon style={{ color: red[500] }} />
                                    </div>
                                )}
                        </>
                    </Box>
                    <Button style={{ width: '20%' }} type="submit" variant="contained" color="primary" onClick={restart}>
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
                                    variant="h5"
                                    aria-label="bubble-title"
                                >
                                    Which of these countries had the largest increase in % change
                                    from 1990 - 2018?
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
                                        variant="h5"
                                        aria-label="bubble-title"
                                    >
                                        Which of these countries had the largest decrease in % change
                                        from 2019 - 2120?
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
                                height='20%'
                                type="submit"
                                variant="contained"
                                color='primary'
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                )}
        </Box>
    );
}
