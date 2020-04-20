import axios from "axios";

const globalUrl = "https://covidapi.info/api/v1/global";
const countryUrl = "https://covidapi.info/api/v1";

export const fetchTotalData = async (country) => {
  if (country) {
    // Download individual country data
    try {
      const {
        data: { result }
      } = await axios.get(`${countryUrl}/country/${country}/latest`);

      const lastUpdate = Object.keys(result)[0];
      const { confirmed, deaths, recovered } = result[lastUpdate];

      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      //download global total data from API
      const {
        data: {
          date,
          result: { confirmed, deaths, recovered }
        }
      } = await axios.get(globalUrl);
      const lastUpdate = date;

      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchDailyData = async (country) => {
  try {
    let fetchURL;

    if (country) {
      fetchURL = `${countryUrl}/country/${country}`;
    } else {
      fetchURL = `${globalUrl}/count`;
    }
    const {
      data: { result }
    } = await axios.get(fetchURL);

    const modifiedData = Object.keys(result).map(function (key, index) {
      const { confirmed, deaths, recovered } = result[key];
      return confirmed ? { confirmed, deaths, recovered, date: key } : null;
    });

    return modifiedData.filter((data) => data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get("https://covid19.mathdro.id/api/countries");

    const modifiedData = countries.map((country) => {
      return { country: country.name, iso: country.iso3 };
    });

    return modifiedData;
  } catch (error) {}
};
