import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchTotalData, fetchDailyData, fetchLocation } from "./api";

class App extends React.Component {
  state = {
    latestData: {},
    timeSeriesData: [],
    country: ""
  };

  async componentDidMount() {
    const fetchedTotalData = await fetchTotalData();
    const fetchedTimeSeries = await fetchDailyData(this.state.country);
    this.setState({ latestData: fetchedTotalData, timeSeriesData: fetchedTimeSeries });
    fetchLocation();
  }

  handleCountryChange = async (country) => {
    const fetchedTotalData = await fetchTotalData(country);
    const fetchedTimeSeries = await fetchDailyData(country);
    this.setState({ latestData: fetchedTotalData, country: country, timeSeriesData: fetchedTimeSeries });
  };

  render() {
    return (
      <div className={styles.container}>
        <Cards data={this.state.latestData} timeSeries={this.state.timeSeriesData} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.timeSeriesData} country={this.state.country} />
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          Source: Johns Hopkins University, Center for Systems Science and Engineering (via covidapi.info)
        </div>
      </div>
    );
  }
}

export default App;
