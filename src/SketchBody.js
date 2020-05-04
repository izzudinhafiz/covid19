import React, { useEffect, useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import simpleTransmission from "./sketches/SimpleTransmission/SimpleTransmission";
import { Grid } from "@material-ui/core";

export default function SketchBody() {
  const [divElement, setDivElement] = useState(null);

  useEffect(() => {
    setDivElement(document.getElementById("sketch1"));
  }, []);

  return (
    <Grid container justify="center">
      <Grid item>
        <P5Wrapper sketch={simpleTransmission} divElement={divElement} />
      </Grid>
    </Grid>
  );
}
