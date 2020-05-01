import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/SimpleTransmission/SimpleTransmission";
import { Grid } from "@material-ui/core";

export default function SketchBody() {
  return (
    <Grid container justify="center" style={{ paddingTop: "10px" }}>
      <Grid item>
        <P5Wrapper sketch={sketch} />
      </Grid>
    </Grid>
  );
}
