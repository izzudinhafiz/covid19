import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let dynamicURL = url;

  if (country !== "Global" && country) {
    dynamicURL = `${url}/countries/${country}`;
  }

  try {
    // const { data } = await axios.get(url);

    // const modifiedData = {
    //   confirmed: data.confirmed,
    //   recovered: data.recovered,
    //   deaths: data.deaths,
    //   lastUpdate: data.lastUpdate,
    // };
    // return modifiedData;

    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(dynamicURL);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((data) => ({
      confirmed: data.confirmed.total,
      deaths: data.deaths.total,
      date: data.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchCountryData = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    const modifiedData = countries.map((country) => country.name);

    return modifiedData;
  } catch (error) {}
};
