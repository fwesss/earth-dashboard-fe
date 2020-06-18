import React from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";

export default function RacingQuiz() {
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
    {
      id: 2,
      question: "When did Italy surpass China in its total count?",
      answer_a: "Feburary 12,2020",
      answer_b: "April 6, 2020",
      answer_c: "March 19, 2020",
      answer_d: "May 4, 2020",
      correct_answer: "c",
    },
    {
      id: 3,
      question: "When did Italy surpass China in its total count?",
      answer_a: "March 19, 2020",
      answer_b: "Feburary 12,2020",
      answer_c: "April 6, 2020",
      answer_d: "May 4, 2020",
      correct_answer: "a",
    },
  ];

  const qustions = questions[0];

  return (
    <div className="container">
      <Progress total="3" current="1" />
      <Questions question="What is react?" />
      <Answers />
      <button className="btn btn-primary">Confirm</button>
    </div>
  );
}
