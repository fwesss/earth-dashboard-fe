import React from "react";
import Answer from "./Answer";

export default function Answers({ currentAnswer, handleClick, question }) {
  return (
    <>
      <Answer
        letter="a"
        answer={question.answer_a}
        handleClick={handleClick}
        selected={currentAnswer === "a"}
      />
      <Answer
        letter="b"
        answer={question.answer_b}
        handleClick={handleClick}
        selected={currentAnswer === "b"}
      />
      <Answer
        letter="c"
        answer={question.answer_c}
        handleClick={handleClick}
        selected={currentAnswer === "c"}
      />
      <Answer
        letter="d"
        answer={question.answer_d}
        handleClick={handleClick}
        selected={currentAnswer === "d"}
      />
    </>
  );
}
