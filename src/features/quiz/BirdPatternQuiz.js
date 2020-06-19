import React, { useState } from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";


const useStyles = makeStyles({
    Container: {
        width: '80%',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function BirdPatternQuiz() {
    const classes = useStyles();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState([]);


    const questions = [
        {
            id: 1,
            question: "In 1970, we can see a rather spread out distribution of observations, with an approximate mean of about 12. In 2015, we see a single peak that contains the greatest distribution of the data. Around which point is the greatest distribution of the data, and therefore the approximate mean of the number of observations in 2015?",
            answer_a: "24",
            answer_b: "14",
            answer_c: "4",
            answer_d: "34",
            correct_answer: "c",
        }
    ];

    const question = questions[currentQuestion];

    const handleClick = e => {
        setCurrentAnswer(e.target.value);
        setError('');
    }

    const renderError = () => {
        if (!error) {
            return;
        }
        return <div className='error'>{error}</div>
    }

    const renderResultsMark = (questions, answer) => {
        if (questions.correct_answer === answer.answer) {
            return <span className='correct'>Correct</span>
        }

        return <span className='Failed'>Failed</span>;
    };

    const renderResultsData = () => {
        return answers.map(answer => {
            const question = questions.find(
                question => question.id === answer.questionId
            );

            return (
                <div key={question.id}>
                    {question.question} - {renderResultsMark(question, answer)}
                </div>
            )
        })
    }

    const restart = () => {
        setAnswers([]);
        setCurrentAnswer('');
        setCurrentQuestion(0);
        setShowResults(false);
    }

    const next = () => {
        const answer = { questionId: question.id, answer: currentAnswer };

        if (!currentAnswer) {
            setError('Please select an option');
            return;
        }

        answers.push(answer);
        setAnswers(answers);
        setCurrentAnswer('');

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        setShowResults(true);
    };

    if (showResults) {
        return (
            <div className="container-results">
                <VisTitle
                    id="bubble-question-title"
                    variant="h4"
                    aria-label="bubble-title"
                >
                    Results
                </VisTitle>
                <ul>{renderResultsData()}</ul>
                <button className="btn btn-primary" onClick={restart}>Restart</button>

            </div>
        )
    } else {
        return (
            <Box className={classes.Container}>
                <Progress total={questions.length} current={currentQuestion + 1} />
                <Questions questions={question.question} />
                {renderError()}
                <Answers
                    question={question}
                    currentAnswer={currentAnswer}
                    handleClick={handleClick}
                />
                <button className="btn btn-primary" onClick={next}>Confirm</button>
            </Box>
        );
    }
}
