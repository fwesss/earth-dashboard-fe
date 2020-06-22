/* eslint-disable */

import React from "react";
import './answer.css'
// import { makeStyles } from "@material-ui/core/styles";


// const useStyles = makeStyles({
//   Button: {
//     color: "#7ECECC",
//     width: "20%",
//     height: "10%",
//     marginBottom: "1rem",
//     borderRadius: "10px",
//     cursor: "pointer",
//     background: "white",
//     borderColor: "#7ECECC",
//     fontSize: "20px",
//     padding: "10px",
//     textAlign: "center",
//     border: "1px solid",
//     outline: "none",
//   },
// });

export default function Answer(props) {
    //   const classes = useStyles();

    let classes = ['answer-']

    if (props.selected) {
        classes.push('selected');
    }
    return (
        <button
            value={props.letter}
            className={classes.join('')}
            onClick={props.handleClick}
        >
            {/* <span className="letter">{props.letter}</span> */}
            {props.answer}
        </button>
    );
}
