/* eslint-disable */

import React, { useState } from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { green, red } from "@material-ui/core/colors";
import { incrementProgress } from "./quizProgressSlice";
import { useDispatch } from "react-redux";
import Confetti from "react-confetti";

const useStyles = makeStyles({
  Container: {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ResultsContainer: {
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  correct: {
    fontSize: "14px",
  },
  fontDisplay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
  },
});

export default function CarbonDioxideQuiz() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState([]);

  const questions = [
    {
      id: 1,
      question:
        "What was the average level of CO2 in the atmosphere from 0-1815 AD?",
      answer_a: "Between 275 and 285",
      answer_b: "Between 200 and 215",
      answer_c: "Between 100 and 185  ",
      answer_d: "Between 300 and 320 ",
      correct_answer: "a",
    },
    {
      id: 2,
      question: "What was the level of CO2 in the atmosphere in 2013?",
      answer_a: "Between 380 and 385",
      answer_b: "Between 373 and 380",
      answer_c: "Between 398 and 401  ",
      answer_d: "Between 389 and 391 ",
      correct_answer: "c",
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = (letter) => {
    setCurrentAnswer(letter);
    setError("");
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const renderResultsMark = (questions, answer) => {
    if (questions.correct_answer === answer.answer) {
      dispatch(incrementProgress("carbonDioxide"));
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "20%",
              overflow: "hidden",
              marginTop: "3rem",
            }}
          >
            <Confetti
              className="confetti"
              gravity={0.4}
              // run={this.state.animationDone}
              numberOfPieces={200}
            />
          </div>
          <span className="correct">
            <h3>Correct</h3>
          </span>
          <CheckCircleIcon style={{ color: green[500] }} />
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="Incorrect">
          <h3>Incorrect</h3>
        </span>
        <HighlightOffIcon style={{ color: red[500] }} />
      </div>
    );
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <VisTitle
          id="bubble-question-title"
          variant="h6"
          aria-label="bubble-title"
          key={question.id}
        >
          <div className={classes.fontDisplay}>
            {question.question} {renderResultsMark(question, answer)}
          </div>
        </VisTitle>
      );
    });
  };

  const restart = () => {
    setAnswers([]);
    setCurrentAnswer("");
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      setError("Please select an option");
      return;
    }

    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    setShowResults(true);
  };

  if (showResults) {
    return (
      <Box className={classes.ResultsContainer}>
        <VisTitle
          id="bubble-question-title"
          variant="h4"
          aria-label="bubble-title"
        >
          Results
        </VisTitle>
        <ul style={{ padding: "0" }}>{renderResultsData()}</ul>
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
    );
  } else {
    return (
      <Box className={classes.Container} data-testid="vis-quiz">
        <Progress total={questions.length} current={currentQuestion + 1} />
        <Questions questions={question.question} />
        {renderError()}
        <Answers
          question={question}
          currentAnswer={currentAnswer}
          handleClick={handleClick}
        />
        <Button
          className="btn btn-primary"
          onClick={next}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </Box>
    );
  }
}
