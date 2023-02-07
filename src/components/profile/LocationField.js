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
    setInputQuery(e.target.value);
    const filteredCities = CitiesList.filter(({ city }) => {
      return city.toLowerCase().includes(e.target.value.toLowerCase());
    }).splice(0, 30);
    setResults(filteredCities);
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
