import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { green, red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import Confetti from "react-confetti";
import VisTitle from "../visualizations/VisTitle";
import Answers from "./answers/Answers";
import Questions from "./questions/Questions";
import Progress from "./Progress";
import { incrementProgress } from "./quizProgressSlice";

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
    height: "70vh",
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
      question: "Where do sea levels start out in 1880?",
      answer_a: "Between -275 and -285",
      answer_b: "Between -165 and -150",
      answer_c: "Between 10 and 100",
      answer_d: "Between -100 and -50",
      correctAnswer: "b",
    },
    {
      id: 2,
      question: "Where were the sea levels in 2013?",
      answer_a: "Between -50 and 0",
      answer_b: "Between -20 and 20",
      answer_c: "Between 55 and 75",
      answer_d: "Between 100 and 150",
      correctAnswer: "c",
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = (letter) => {
    setCurrentAnswer(letter);
    setError("");
  };

  const renderError = () => error && <div className="error">{error}</div>;

  const renderResultsMark = ({ correctAnswer }, answer) => {
    dispatch(incrementProgress("climateSummary"));

    return correctAnswer === answer.answer ? (
      <Box display="flex" justifyContent="center" alignItems="center">
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "20%",
            overflow: "hidden",
            marginTop: "1rem",
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
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center">
        <span className="Incorrect">
          <h3>Incorrect</h3>
        </span>
        <HighlightOffIcon style={{ color: red[500] }} />
      </Box>
    );
  };

  const renderResultsData = () =>
    answers.map((answer) => (
      <VisTitle
        id="bubble-question-title"
        variant="h6"
        aria-label="bubble-title"
        key={question.id}
      >
        <div className={classes.fontDisplay}>
          {question.question}{" "}
          {renderResultsMark(
            questions.find(({ id }) => id === answer.questionId),
            answer
          )}
        </div>
      </VisTitle>
    ));

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
