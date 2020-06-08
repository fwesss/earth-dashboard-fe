import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export default ({ data, handleChange }) => (
  <>
    <Box p={5} id="info-section">
      <FormControl component="fieldset">
        <Typography variant="h4" component="h2">
          Dataset
        </Typography>
        <FormLabel component="legend" hidden>
          Dataset
        </FormLabel>
        <RadioGroup
          aria-label="dataset"
          name="dataset1"
          value={data.selected}
          onChange={handleChange}
        >
          <FormControlLabel
            value="pollution"
            control={<Radio />}
            label="Pollution from major cities"
          />
          <FormControlLabel
            value="recycled"
            control={<Radio />}
            label="Amount of waste recycled by countries"
          />
        </RadioGroup>
      </FormControl>
    </Box>

    <Divider variant="middle" />

    <Box p={5}>
      {data.selected === "pollution" ? (
        <>
          <Typography variant="h5" component="h2">
            Pollution From Major Cities
          </Typography>
          <Typography>
            Humans across the planet produce pollution but some cities produce
            more than their fair share. We can see which cities are polluting
            heavily but examining the height and color intensity of the columns
            representing pollution levels.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2">
            Waste Recycled by Countries
          </Typography>
          <Typography>
            Recycling programs of varying effectiveness have been implemented
            around the world. We can get a high level picture of the amount of
            waste that&apos;s recycled by each country by examining the color
            intensity of the country.
          </Typography>
        </>
      )}
    </Box>
  </>
);
