import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  const displayData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };

  if (!confirmed) {
    displayData.confirmed = 0;
    displayData.recovered = 0;
    displayData.deaths = 0;
    displayData.lastUpdate = new Date().toDateString();
  } else {
    displayData.confirmed = confirmed.value;
    displayData.recovered = recovered.value;
    displayData.deaths = deaths.value;
    displayData.lastUpdate = new Date(lastUpdate).toDateString();
  }

  return (
    <div className={styles.container}>
      <Grid container justify="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={displayData.confirmed} duration={0.5} separator="," />
            </Typography>
            <Typography color="textSecondary">Updated: {displayData.lastUpdate}</Typography>
            <Typography variant="body2">Number of total COVID-19 cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={displayData.recovered} duration={0.5} separator="," />
            </Typography>
            <Typography color="textSecondary">Updated: {displayData.lastUpdate}</Typography>
            <Typography variant="body2">Number of recovered COVID-19 cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={displayData.deaths} duration={0.5} separator="," />
            </Typography>
            <Typography color="textSecondary">Updated: {displayData.lastUpdate}</Typography>
            <Typography variant="body2">Number of deaths due to COVID-19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;