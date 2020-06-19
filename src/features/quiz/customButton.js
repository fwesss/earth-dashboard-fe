// import React from "react";
// import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//     button: {
//         backgroundColor: props => props.actionBackgroundColor,
//         borderColor: props => props.actionBackgroundColor,
//         color: props => {
//             if (props.actionTextColor) {
//                 return `${props.actionTextColor} !important`;
//             }
//             return null;
//         },
//         "&:hover": {
//             backgroundColor: props => props.actionHoverColor,
//             borderColor: props => props.actionHoverColor,
//             color: props => {
//                 if (props.actionHoverTextColor) {
//                     return `${
//                         props.actionHoverTextColor
//                             ? props.actionHoverTextColor
//                             : props.actionTextColor
//                                 ? props.actionTextColor
//                                 : "inherit"
//                         } !important`;
//                 }
//                 return "inherit";
//             }
//         }
//     }
// });

// const CustomButton = (props) => {
//     console.log(props);
//     const classes = useStyles(props);
//     return (
//         <Button variant="contained" color="primary" className={classes.button}>
//             {}
//         </Button>
//     );
// };

// export default CustomButton;
