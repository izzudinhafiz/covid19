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
    //download global total data from API
    try {
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
      data: { result }
    } = await axios.get(`${globalUrl}/latest`);
    const iso3 = result.map((result) => Object.keys(result)[0]);

    let searchString = "https://restcountries.eu/rest/v2/alpha?codes=";
    iso3.forEach((country) => {
      searchString = searchString.concat(country, ";");
    });

    let { data: countries } = await axios.get(searchString);
    countries = countries.filter((country) => country);

    const modifiedData = countries.map((country) => {
      return { name: country.name, iso3: country.alpha3Code, iso2: country.alpha2Code };
    });

    for (let index = 0; index < modifiedData.length; index++) {
      const element = modifiedData[index];

      if (element.name.indexOf("(") > 0) {
        element.name = element.name.split("(")[0];
      }

      if (element.name.indexOf(" and ") > 0) {
        element.name = element.name.split(" and ")[0];
      }

      if (element.name.indexOf(",") > 0) {
        element.name = element.name.split(",")[0];
      }

      if (element.iso3 === "GBR") {
        element.name = "United Kingdom";
      } else if (element.iso3 === "VNM") {
        element.name = "Vietnam";
      } else if (element.iso3 === "KOR") {
        element.name = "South Korea";
      } else if (element.iso3 === "LAO") {
        element.name = "Laos";
      }
    }

    return modifiedData.sort((a, b) => (a.name > b.name ? 1 : -1));
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocation = async () => {
  try {
    const {
      data: { country }
    } = await axios.get("https://ipinfo.io?token=b092506d1e5aeb");
    return country;
  } catch (error) {
    console.log(error);
  }
};
