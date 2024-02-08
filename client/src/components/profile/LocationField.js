import React, { useState, useEffect } from "react";
import { CitiesList } from "../shared/CitiesList";
import SearchableField from "./SearchableField";

const LocationField = ({ placeholder, setNewFormValue }) => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [inputQuery, setInputQuery] = useState("");

  useEffect(() => {
    if (selectedResult) {
      const newLocationValue = formatResult(selectedResult);
      setInputQuery(newLocationValue);
      setResults([]);
    }

    updateParentForm();
  }, [selectedResult]);

  const updateParentForm = () => {
    if (selectedResult) {
      setNewFormValue("location", formatResult(selectedResult));
      setNewFormValue("lat", selectedResult.lat);
      setNewFormValue("lng", selectedResult.lng);
    } else {
      setNewFormValue("location", null);
      setNewFormValue("lat", null);
      setNewFormValue("lng", null);
    }
  };

  const handleInputQuery = (e) => {
    const value = e.target.value;
    setInputQuery(value);
    const filteredByCities = searchLocationsByField("city", value);

    const filteredByStates = searchLocationsByField("admin_name", value);

    const filteredByCountries = searchLocationsByField("country", value);

    const filteredResults = filteredByCities.concat(
      filteredByStates,
      filteredByCountries
    );

    const uniqFilteredResults = filteredResults.filter((result, index) => {
      return filteredResults.indexOf(result) == index;
    });
    setResults(uniqFilteredResults);
  };

  const searchLocationsByField = (field, value) => {
    return CitiesList.filter((location) => {
      return location[field].toLowerCase().includes(value.toLowerCase());
    }).splice(0, 30);
  };

  const formatResult = (result) => {
    const stringifiedLocation = `${result.city ? result.city + ", " : ""}${
      result.admin_name ? result.admin_name + ", " : ""
    }${result.country ? result.country : ""}`;
    return stringifiedLocation;
  };

  return (
    <SearchableField
      lableName="Location"
      handleInputQuery={handleInputQuery}
      setInputQuery={setInputQuery}
      inputQuery={inputQuery}
      setSelectedResult={setSelectedResult}
      formatResult={formatResult}
      placeholder={placeholder}
      results={results}
    />
  );
};

export default LocationField;
