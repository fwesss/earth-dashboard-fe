import React from "react";
import "./answer.css";
import Button from "@material-ui/core/Button";

export default function Answer({ answer, handleClick, letter, selected }) {
  const classes = ["answer-"];

  if (selected) {
    classes.push("selected");
  }

  return (
    <Button
      className={classes.join("")}
      onClick={() => handleClick(letter)}
      size="large"
    >
      {answer}
    </Button>
  );
}
