/* eslint-disable */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { green, red } from "@material-ui/core/colors";
import VisTitle from "../visualizations/VisTitle";
import Answers from "./answers/Answers";
import Questions from "./questions/Questions";
import Progress from "./Progress";
import VisExplanation from "../visualizations/VisExplanation";
import { incrementProgress } from "./quizProgressSlice";
import { useDispatch } from "react-redux";
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
    height: "80vh",
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

export default function SymbiosisQuiz() {
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
        "Which animal has 3 relationships with other animals, including both mutualism and commensalism?",
      answer_a: "Zebra",
      answer_b: "Algae",
      answer_c: "Oxpecker bird",
      answer_d: "Sea Anemone",
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
      dispatch(incrementProgress("symbiosis"));

      return (
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center" alignItems="center">
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "27%",
                overflow: "hidden",
                marginTop: "8.5rem",
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
          </Box>

          <Box display="flex" flexDirection="column">
            <Typography variant="h4">The Oxpecker bird</Typography>
            <VisExplanation>
              While the oxpecker has mutually beneficial relationships with the
              zebra and water buffalo, recent studies have found that the
              oxpecker, while picking bugs and parasites off the rhino, also
              opens and picks at the rhino’s wounds, sometimes even dining on
              its blood. On the other hand, the rhino has poor eyesight, and the
              oxpecker sounds the alarm when predators are near. So overall, a
              bit of a zero-sum game for the rhino.
            </VisExplanation>
          </Box>
        </Box>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "5.85rem",
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
  }
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
