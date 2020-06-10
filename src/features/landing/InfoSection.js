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
            Carbon Footprint of Major Cities
          </Typography>
          <Typography>
            Humans across the planet produce pollution but some cities produce
            more than their fair share. The amount of greenhouse gas emissions
            produced by a city can be referred to as the city&apos;s carbon
            footprint. We can see which cities have a larger carbon footprint by
            examining the height and color intensity of the columns. The higher
            the column, the larger the carbon footprint. For example, Los
            Angeles has a carbon footprint of 196.4~ Mt CO2 (Megatons of carbon
            dioxide equivalent). We can reduce a city&apos;s carbon footprint by
            limiting the use of nonelectric transportation, by carpooling,
            biking, and using mass transit, by reducing consumption of ruminants
            such as cattle, by reducing the products you send to the landfill,
            and by using energy-efficient lighting. What ways can you think of
            to cut back on your city&apos;s carbon footprint?
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
