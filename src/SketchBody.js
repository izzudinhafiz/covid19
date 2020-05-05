import React from "react";
import P5Wrapper from "./sketches/P5Wrapper";
import simpleTransmission from "./sketches/SimpleTransmission/SimpleTransmission";
import { Grid } from "@material-ui/core";

export default function SketchBody(props) {
  return (
    <Grid container justify="center">
      <Grid item>
        <P5Wrapper sketch={simpleTransmission} />
      </Grid>
    </Grid>
  );
}
