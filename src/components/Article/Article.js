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
              The SIR models has three interactions. (1) Susceptible people interact with infectious people and have a chance to contract the disease. (2)
              Infectious people will slowly recover, the rate at which they recover is dependant on the level of medical care available. Lastly (3) Recovered
              people can no longer transmit the disease because they have gained immunity against the disease.
            </Typography>
            <Typography align="justify" variant="body2" paragraph>
              Below we have a simple simulation of a disease spreading in a population with no mitigating factors at all. We can see how quickly the disease
              spreads to the whole population.
            </Typography>
            <SketchBody />
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
