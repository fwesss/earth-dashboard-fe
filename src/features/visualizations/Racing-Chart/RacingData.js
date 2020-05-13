import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
} from "@material-ui/core";
// import "./App.css";

const getRandomIndex = array => {
    return Math.floor(array.length * Math.random());
};

function RacingData() {
    const [iteration, setIteration] = useState(0);
    const [start, setStart] = useState(false);
    const [data, setData] = useState([
        {
            name: "USA",
            deaths: 0,
        },
        {
            name: "Italy",
            deaths: 0,
        },
        {
            name: "China",
            deaths: 0,
        },
        {
            name: "Spain",
            deaths: 0,
        },
        {
            name: "Russia",
            deaths: 0,
        }
    ]);

    useInterval(() => {
        if (start) {
            const randomIndex = getRandomIndex(data);
            setData(
                data.map((entry, index) =>
                    index === randomIndex
                        ? {
                            ...entry,
                            deaths: entry.deaths + 1
                        }
                        : entry
                )
            );
            setIteration(iteration + 1);
        }
    }, 500);

    return (
        <React.Fragment>
            <h1>Racing Bar Chart</h1>
            <RacingBarChart data={data} />
            <button onClick={() => setStart(!start)}>
                {start ? "Stop the race" : "Start the race!"}
            </button>
            <p>Iteration: {iteration}</p>
        </React.Fragment>
    );
}


export default RacingData;