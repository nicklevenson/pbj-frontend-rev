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
    <div className="w-64 mx-auto">
      <label htmlFor="instruments filter">Instruments</label>
      <br />
      <input
        name="instruments filter"
        className="border border-solid rounded p-2 w-full"
        placeholder="Search for Instruments"
        value={inputQuery}
        onInput={(e) => handleInputQuery(e)}
        aria-label="instrument search"
        autoComplete="off"
        type="text"
      />

      <div
        className="bg-gray-200 text-left overflow-y-scroll max-h-32 w-full"
        onClick={(e) => handleClick(e)}
      >
        {inputQuery !== ""
          ? results.map((result) => {
              return (
                <div className="p-2 border-b broder border-gray-300">
                  {result}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default InstrumentSelection;
