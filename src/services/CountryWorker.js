/** @format */

import { error, warn, log } from "./../Omni";

const CountryWorker = {
  getAllCountries: async () => {
    return await fetch("https://restcountries.eu/rest/v1/all")
      .then((response) => response.json())
      .then((json) => {
        if (json.length != 0) {
          const data = {};
          for (const country of json) {
            data[`${country.alpha2Code}`] = country.name;
          }
          return data;
        }
        callback({});
      })
      .catch((error) => warn(error));
  },
};

export default CountryWorker;
