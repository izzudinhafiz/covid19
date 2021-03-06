import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, timeSeries }) => {
  const lastData = timeSeries[timeSeries.length - 1];
  const secondLast = timeSeries[timeSeries.length - 2];

  const displayData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate
  };

  const deltaData = {
    confirmed,
    recovered,
    deaths
  };

  if (!confirmed) {
    displayData.confirmed = 0;
    displayData.recovered = 0;
    displayData.deaths = 0;
    displayData.lastUpdate = new Date().toDateString();

    deltaData.confirmed = 0;
    deltaData.recovered = 0;
    deltaData.deaths = 0;
  } else {
    displayData.confirmed = lastData.confirmed;
    displayData.recovered = lastData.recovered;
    displayData.deaths = lastData.deaths;
    displayData.lastUpdate = new Date(`${lastData.date}T12:00:00+00:00`).toDateString();
    deltaData.confirmed = displayData.confirmed - secondLast.confirmed;
    deltaData.recovered = displayData.recovered - secondLast.recovered;
    deltaData.deaths = displayData.deaths - secondLast.deaths;
  }

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={8} sm={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Infected</Typography>
            <div className={styles.counter}>
              <Typography variant="h6">
                <CountUp start={0} end={displayData.confirmed} duration={0.5} separator="," />
              </Typography>
              <Typography variant="subtitle1" className={styles.confirmedDelta}>
                +<CountUp start={0} end={deltaData.confirmed} duration={0.5} separator="," />
              </Typography>
            </div>
            <Typography color="textSecondary" variant="caption">
              Updated: {displayData.lastUpdate}
            </Typography>
          </CardContent>
          <div className={styles.infected}></div>
        </Card>
      </Grid>
      <Grid item xs={8} sm={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Recovered</Typography>
            <div className={styles.counter}>
              <Typography variant="h6">
                <CountUp start={0} end={displayData.recovered} duration={0.5} separator="," />
              </Typography>
              <Typography variant="subtitle1" className={styles.recoveredDelta}>
                +<CountUp start={0} end={deltaData.recovered} duration={0.5} separator="," />
              </Typography>
            </div>
            <Typography color="textSecondary" variant="caption">
              Updated: {displayData.lastUpdate}
            </Typography>
          </CardContent>
          <div className={styles.recovered}></div>
        </Card>
      </Grid>
      <Grid item xs={8} sm={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">Deaths</Typography>
            <div className={styles.counter}>
              <Typography variant="h6">
                <CountUp start={0} end={displayData.deaths} duration={0.5} separator="," />
              </Typography>
              <Typography variant="subtitle1" className={styles.deathsDelta}>
                +<CountUp start={0} end={deltaData.deaths} duration={0.5} separator="," />
              </Typography>
            </div>
            <Typography color="textSecondary" variant="caption">
              Updated: {displayData.lastUpdate}
            </Typography>
          </CardContent>
          <div className={styles.deaths}></div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;
