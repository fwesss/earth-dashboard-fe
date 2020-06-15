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
            footprint.
          </Typography>
          <Typography>
            We can see which cities have a larger carbon footprint by examining
            the height and color intensity of the columns. The higher the
            column, the larger the carbon footprint. For example, Los Angeles
            has a carbon footprint of 196.4~ Mt CO2 (Megatons of carbon dioxide
            equivalent).
          </Typography>
          <Typography>
            We can reduce a city&apos;s carbon footprint by limiting the use of
            nonelectric transportation, by carpooling, biking, and using mass
            transit, by reducing consumption of ruminants such as cattle, by
            reducing the products you send to the landfill, and by using
            energy-efficient lighting. What ways can you think of to cut back on
            your city&apos;s carbon footprint?
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2">
            Waste Recycled by Countries
          </Typography>
          <Typography>
            Recycling is one of the simplest ways that we can help keep our
            earth healthy and clean. When we recycle, used materials are
            converted into new products reducing the need to consume more of the
            earth’s natural resources, when we manufacture with recycled
            materials less energy is used in the process which in return reduces
            greenhouse gas emissions, the benefits of recycling are a no
            brainer.
          </Typography>
          <Typography>
            Here we can see different countries from around the world and the
            amount that the country recycles, the taller the visual is for the
            country represents a larger % of recycled waste. Hover over South
            Korea and you can see that they recycle most with 59.18% of their
            waste recycled.
          </Typography>
          <Typography>
            We can help the longevity and health of our earth by keeping
            recycling in our decisions, we can reuse bottles and make sure that
            they are recycled when done, we can purchase products that use
            recycled materials, and by separating our trash and plastics into
            their different containers so the plastic does not make it to the
            landfills.
          </Typography>
        </>
      )}
    </Box>
  </>
);
