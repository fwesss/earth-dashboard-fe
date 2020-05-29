import React from "react";
import { useTheme, Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Blurb from "./Blurb";
import { ReactComponent as Arrow } from "../arrow.svg";

const BlurbSection = () => {
  const { summary } = useSelector((state) => state.bubblesReducer);
  const theme = useTheme();

  return (
    <>
      <Box py={theme.spacing(2)}>
        <Typography id="what-is-planet-data" variant="h2" align="center">
          What is Planet Data?
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <Blurb id={1}>Planet Data is an interactive playground</Blurb>
        <Blurb id={2}>
          Planet Data is a learning tool for data visualization.
        </Blurb>
        <Blurb id={3}>
          Planet Data lets you immerse yourself in real-time data.
        </Blurb>
      </Box>
      <Box py={theme.spacing(2)}>
        <Typography variant="h3" align="center">
          A look at what is happening on Earth right now:
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" flexWrap="wrap">
        <Blurb id={4}>
          As people are starting to stay at home, more wildlife have been
          spotted on empty streets.
        </Blurb>
        <Blurb id={5}>
          There are{" "}
          <strong>
            {summary
              ? summary
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.totalconfirmed,
                    0
                  )
                  .toLocaleString()
              : "calculating..."}{" "}
            confirmed COVID-19 cases
          </strong>{" "}
          world-wide.
        </Blurb>
        <Blurb id={6}>
          Two cats have tested positive for COVID-19 in New York.
        </Blurb>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={theme.spacing(2)}
      >
        <Typography variant="h5" component="p" align="center">
          Want to learn more?
        </Typography>
        <Typography variant="h5" component="p" align="center">
          Let&apos;s play around with some visuals
        </Typography>
        <Box py={theme.spacing(1)}>
          <Arrow />
        </Box>
      </Box>
    </>
  );
};

export default BlurbSection;
