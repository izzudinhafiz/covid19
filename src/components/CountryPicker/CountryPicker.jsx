import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";

import { fetchCountryData } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountries(await fetchCountryData());
    };

    fetchCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">Global</option>
        {countries
          ? countries.map((country) => (
              <option key={country.country} value={country.iso}>
                {country.country}
              </option>
            ))
          : null}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
