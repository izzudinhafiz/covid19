import React, { useState } from "react";
import P5Wrapper from "./sketches/P5Wrapper";
import simpleTransmission from "./sketches/SimpleTransmission/SimpleTransmission";
import Plot from "./sketches/components/Plot";
import { Grid } from "@material-ui/core";

export default function SketchBody(props) {
  const [state, setState] = useState([]);

  return (
    <Grid container justify="center">
      <Grid item>
        <P5Wrapper sketch={simpleTransmission} data={state} updateData={setState} />
        <P5Wrapper sketch={Plot} data={state} />
      </Grid>
    </Grid>
  );
}
