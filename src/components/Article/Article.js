import React from "react";
import { Grid, Divider, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SketchBody from "../../SketchBody";

const useStyles = makeStyles((theme) => ({
  sketchMobile: {
    width: "100%"
  }
}));

export function Article(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              How a Virus Spreads
            </Typography>
            <Divider />
            <Typography align="justify" variant="body2" paragraph>
              Epidemiologist models how viruses spread to people using a Susceptible, Infectious & Recovered (SIR) Model. In this model, we have three groups of
              people:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2" paragraph>
                  Susceptible: Healthy people who have not been infected by a virus
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Infectious: People who are already infected by a virus
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Recovered: People who were infected and now has either recovered or -unfortunately- died
                </Typography>
              </li>
            </ul>
            <Typography align="justify" variant="body2" paragraph>
              Based on this model, Susceptible people are
            </Typography>
            <div id="sketch1">
              <SketchBody />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
