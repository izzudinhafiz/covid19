import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";

export default function AnalysisBody() {
  return (
    <div style={{ padding: "0 5px" }}>
      <Grid container direction="column" alignContent="center" spacing={2}>
        <Grid item xs={12} sm={8} style={{ marginTop: "10px" }}>
          <Typography variant="h4" gutterBottom>
            Analysis of Virus
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography align="justify" variant="body1">
            This is the story of a girl, who cried a river and drown the whole world. She looks so sad in photographs but I absolutely love it when she smiles
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
