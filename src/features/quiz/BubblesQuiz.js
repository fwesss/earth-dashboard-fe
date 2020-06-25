/* eslint-disable */

import React, { useState, useEffect } from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import VisTitle from "../visualizations/VisTitle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { green, red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { incrementProgress } from "./quizProgressSlice";
import Confetti from "react-confetti";

const useStyles = makeStyles({
  Container: {
    width: "100%",
    height: "70vh",
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

export default function BubbleQuiz() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState([]);
  const [active, setActive] = useState(false);
  const confettiConfig = {
    angle: 90,
    spread: "214",
    startVelocity: 45,
    elementCount: "99",
    dragFriction: 0.1,
    duration: "5570",
    stagger: "6",
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const questions = [
    {
      id: 1,
      question: "Which country has the largest number of cases?",
      answer_a: "Brazil",
      answer_b: "Russia",
      answer_c: "China",
      answer_d: "United States of America",
      correct_answer: "d",
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = (letter) => {
    setCurrentAnswer(letter);
    setError("");
  };

  useEffect(() => {
    setActive(false);
  });

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const renderResultsMark = (questions, answer) => {
    if (questions.correct_answer === answer.answer) {
      dispatch(incrementProgress("bubbles"));
      return (
        <div
          className="correct-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              height: "30%",
              overflow: "hidden",
              marginTop: "2rem",
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
