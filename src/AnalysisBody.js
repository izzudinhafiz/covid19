import React from "react";
import { Grid } from "@material-ui/core";
import { Article } from "./components/Article/Article";

export default function AnalysisBody() {
  return (
    <Grid container direction="column" alignContent="center" style={{ marginTop: "5px" }} spacing={3}>
      <Article />
    </Grid>
  );
}
