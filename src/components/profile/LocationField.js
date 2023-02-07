import React, { useState, useEffect } from "react";
import { CitiesList } from "../shared/CitiesList";

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
    <div className="text-center w-[80%] mx-auto">
      <label className="font-bold">Location</label>
      <input
        onChange={handleInputQuery}
        className="border border-solid rounded p-2 w-full"
        placeholder={placeholder}
        value={inputQuery}
        onClick={() => {
          setInputQuery("");
          setSelectedResult(null);
        }}
      />
      <div className="bg-gray-200 text-left overflow-y-scroll max-h-32 w-full absolute z-10">
        {inputQuery !== ""
          ? results.map((result) => {
              return (
                <div
                  className="p-2 border-b broder border-gray-300"
                  onClick={() => setSelectedResult(result)}
                >
                  {formatResult(result)}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default LocationField;
