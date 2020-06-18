import React from "react";

export default function Answer(props) {
  return (
    <button value={props.letter} className="answer">
      <span className="letter">{props.letter}</span>
      {props.answer}
    </button>
  );
}
