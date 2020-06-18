import React, { useState } from "react";
import Answer from "./Answer";

export default function Answers(props) {
  return (
    <>
      <Answer letter="A" answer="Framework" />
      <Answer letter="B" answer="Library" />
      <Answer letter="D" answer="Library" />
      <Answer letter="D" answer="Library" />
    </>
  );
}
