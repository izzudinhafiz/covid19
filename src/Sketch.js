import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import SketchBody from "./SketchBody";
import SocialDistancing from "./sketches/SocialDistancing/SocialDistancing";

export default function Sketch(props) {
  return (
    <React.Fragment>
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent>
            <SketchBody sketch={SocialDistancing} />
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
