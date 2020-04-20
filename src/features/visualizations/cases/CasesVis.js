import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Plot from "react-plotly.js";

import { getCases } from "./casesSlice";

const CasesVis = () => {
  const dispatch = useDispatch();
  const { cases } = useSelector((state) => state.casesVis);

  useEffect(() => {
    dispatch(getCases());
  }, [dispatch]);

  if (cases) {
    return (
      <Plot
        data={cases.data}
        layout={cases.layout}
        frames={cases.frames}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  return (
    <Backdrop open invisible>
      <CircularProgress />
    </Backdrop>
  );
};

export default CasesVis;
