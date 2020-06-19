/* eslint-disable */

import React, { useState } from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";

export default function RacingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState([]);

  const questions = [
    {
      id: 1,
      question: "When did Italy surpass China in its total count?",
      answer_a: "Feburary 12,2020",
      answer_b: "March 19, 2020",
      answer_c: "April 6, 2020",
      answer_d: "May 4, 2020",
      correct_answer: "b",
    },
  ];

  const question = questions[currentQuestion];

  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
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
      return <span className="correct">Correct</span>;
    }

    return <span className="Failed">Failed</span>;
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultsMark(question, answer)}
        </div>
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
      <div className="container-results">
        <h3>Results</h3>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart
        </button>
      </div>
    );
  }
  return (
    <div className="container">
      <Progress total={questions.length} current={currentQuestion + 1} />
      <Questions questions={question.question} />
      {renderError()}
      <Answers
        question={question}
        currentAnswer={currentAnswer}
        handleClick={handleClick}
      />
      <button className="btn btn-primary" onClick={next}>
        Confirm
      </button>
    </div>
  );
}
