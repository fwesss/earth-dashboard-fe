import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import { makeStyles } from "@material-ui/core/styles";
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
        marginLeft: "2rem"
    }
})


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
        } else if (
            givenAnswer.answer === "USA" ||
            givenAnswer.answer === "Usa" ||
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
            {showResults ? (
                // results page
                <Box className='container-results' style={{ display: "flex", flexDirection: 'column', justifyContent: "center", width: '12%' }}>
                    <Box className='answer-results'>
                        <>
                            {correct ? (
                                <div className="correct-answer" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                    <h1>Correct</h1>
                                    <CheckCircleIcon style={{ color: green[500] }} />
                                </div>
                            ) : (
                                    <div className="wrong-answer" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        <h1>Failed</h1>
                                        <HighlightOffIcon style={{ color: red[500] }} />
                                    </div>
                                )}
                        </>
                    </Box>
                    <Button type="submit" variant="contained"
                        color="primary" onClick={restart}>
                        Retry
                    </Button>
                </Box>
            ) : (
                    <Box className='formContainer' style={{ width: '60%' }}>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={handelSubmit}>
                            <VisTitle
                                id="bubble-question-title"
                                variant="h4"
                                aria-label="bubble-title"
                            >
                                Which country has the largest number of cases?
                        </VisTitle>

                            <Box style={{ width: '70%' }}>
                                <TextField
                                    className={classes.input}
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
                            </Box>
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
                    </Box>
                )}
        </Box>
    );
}