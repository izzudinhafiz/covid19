import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect, Grid, Button } from "@material-ui/core";

import { fetchCountryData, fetchLocation } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountries(await fetchCountryData());
    };

    fetchCountries();
  }, []);

  const handleClick = async () => {
    const selectElement = document.getElementById("country-select");
    const buttonElement = document.getElementById("button-location");

    if (buttonElement.innerText !== "GLOBAL") {
      const countryClick = await fetchLocation();
      const index = countries.map((country) => country.iso2).indexOf(countryClick);
      if (index !== -1) {
        selectElement.value = countries[index].iso3;
        buttonElement.innerText = "Global";
      }
    } else {
      buttonElement.innerText = "My Country";
      selectElement.value = "";
    }

    handleCountryChange(selectElement.value);
  };

  const handleSelect = (element) => {
    const buttonElement = document.getElementById("button-location");
    handleCountryChange(element.target.value);

    if (element.target.value !== "" && buttonElement.innerText !== "GLOBAL") {
      buttonElement.innerText = "Global";
    } else {
      buttonElement.innerText = "My Country";
    }
  };

  return (
    <Grid container spacing={1} className={styles.gridContainer}>
      <Grid item>
        <FormControl className={styles.formControl}>
          <NativeSelect
            id="country-select"
            defaultValue=""
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option value="">Global</option>
            {countries
              ? countries.map((country) => (
                  <option key={country.name} value={country.iso3}>
                    {country.name}
                  </option>
                ))
              : null}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item>
        <Button id="button-location" variant="contained" size="small" disableElevation color="primary" onClick={handleClick} className={styles.buttonLocation}>
          My Country
        </Button>
      </Grid>
    </Grid>
  );
};

export default CountryPicker;
