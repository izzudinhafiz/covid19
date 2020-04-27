import React from "react";
import { Chart as Chartjs } from "chart.js";

import styles from "./Chart.module.css";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  chartRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: window.innerWidth });
    });
    const dailyData = this.props.data;

    this.myChart = new Chartjs(this.chartRef.current, {
      type: "line",
      data: {
        labels: dailyData.map(({ date }) => {
          return new Date();
        }),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  day: "MMM DD"
                },
                stepSize: 7
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                callback: (value, index, values) => {
                  const units = ["k", "M", "B", "T"];
                  const order = Math.floor(Math.log(values[0]) / Math.log(1000));

                  if (order > 0) {
                    const unitName = units[order - 1];
                    return value / 1000 ** order + unitName;
                  } else {
                    return value;
                  }
                },
                fontSize: 12
              }
            }
          ]
        }
      }
    });
  }

  componentDidUpdate() {
    const dailyData = this.props.data;
    this.myChart.data.labels = dailyData.map(({ date }) => {
      return new Date(date);
    });
    this.myChart.data.datasets[0].data = dailyData.map(({ confirmed }) => confirmed);
    this.myChart.data.datasets[1].data = dailyData.map(({ recovered }) => recovered);
    this.myChart.data.datasets[2].data = dailyData.map(({ deaths }) => deaths);

    if (this.state.windowWidth <= 500) {
      this.myChart.options.scales.yAxes[0].ticks.fontSize = 10;
      this.myChart.options.maintainAspectRatio = false;
    } else {
      this.myChart.options.scales.yAxes[0].ticks.fontSize = 12;
      this.myChart.options.maintainAspectRatio = true;
    }
    this.myChart.update();
  }

  render() {
    return (
      <div className={styles.container}>
        <canvas id="myChart" ref={this.chartRef}></canvas>
      </div>
    );
  }
}

export default Chart;
