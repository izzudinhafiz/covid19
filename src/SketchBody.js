import React, { useState, useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/SimpleTransmission/SimpleTransmission";
import { Grid } from "@material-ui/core";

export default function SketchBody() {
  const [size, setSize] = useState(0);
  const { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {
    setSize(Math.min(width * 0.95, height * 0.8));
  }, []);

  return (
    <Grid container justify="center" style={{ paddingTop: "10px" }}>
      <Grid item>
        <P5Wrapper sketch={sketch} size={size} />
      </Grid>
    </Grid>
  );
}
