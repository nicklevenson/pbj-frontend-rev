import { useState } from "react";

const InstrumentSelection = ({ list, setInstrumentsCallback }) => {
  const [inputQuery, setInputQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = (e) => {
    const selection = e.target.innerText;
    setInstrumentsCallback(selection);
    setResults([]);
    setInputQuery("");
  };

  const handleInputQuery = (e) => {
    setInputQuery(e.target.value);
    const filteredInstruments = list
      .filter((instrument) => {
        return instrument.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .splice(0, 30);
    setResults(filteredInstruments);
  };

  return (
    <div className="instruments-filter">
      <label htmlFor="instruments filter">Instruments</label>
      <br />
      <input
        name="instruments filter"
        className="filter-input"
        placeholder="Search for Instrument"
        value={inputQuery}
        onInput={(e) => handleInputQuery(e)}
        aria-label="instrument search"
        autoComplete="off"
        type="text"
      />

      <div
        className="instruments-results options"
        onClick={(e) => handleClick(e)}
      >
        {inputQuery !== ""
          ? results.map((result) => {
              return <div>{result}</div>;
            })
          : null}
      </div>
    </div>
  );
};

export default InstrumentSelection;
