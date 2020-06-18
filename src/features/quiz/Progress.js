import React, { useState } from "react";

export default function Progress(props) {
  return (
    <h2>
      Question {props.current} of {props.total}
    </h2>
  );
}
