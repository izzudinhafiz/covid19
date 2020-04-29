import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import { fetchTotalData, fetchDailyData } from "./api";
import { Grid, Typography } from "@material-ui/core";

class AppBody extends React.Component {
  state = {
    latestData: {},
    timeSeriesData: [],
    country: ""
  };

  async componentDidMount() {
    const fetchedTotalData = await fetchTotalData();
    const fetchedTimeSeries = await fetchDailyData(this.state.country);
    this.setState({ latestData: fetchedTotalData, timeSeriesData: fetchedTimeSeries });
  }

  handleCountryChange = async (country) => {
    const fetchedTotalData = await fetchTotalData(country);
    const fetchedTimeSeries = await fetchDailyData(country);
    this.setState({ latestData: fetchedTotalData, country: country, timeSeriesData: fetchedTimeSeries });
  };

  render() {
    return (
      <Grid container direction="column" alignItems="stretch">
        <Grid item style={{ padding: "10px 0" }}>
          <Cards data={this.state.latestData} timeSeries={this.state.timeSeriesData} />
        </Grid>
        <Grid item style={{ padding: "10px 0" }}>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
        </Grid>
        <Grid item align="center" style={{ padding: "10px 0" }}>
          <Chart data={this.state.timeSeriesData} country={this.state.country} />
        </Grid>
        <Grid item align="center" style={{ padding: "10px 0" }}>
          <Typography variant="caption">Source: Johns Hopkins University, Center for Systems Science and Engineering (via covidapi.info)</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default AppBody;
