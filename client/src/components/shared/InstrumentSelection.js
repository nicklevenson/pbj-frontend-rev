import { useState } from "react";

const InstrumentSelection = ({
  list,
  setInstrumentsCallback,
  title = "Instruments",
  submitable = false,
}) => {
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
    <div>
      <label className="font-semibold" htmlFor="instruments filter">
        {title}
      </label>
      <br />
      <div className="flex gap-2">
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

        {submitable && (
          <button
            className="button-blue px-6"
            onClick={() => setInstrumentsCallback(inputQuery)}
          >
            Add
          </button>
        )}
      </div>
      <div
        className="bg-slate-200 text-left overflow-y-scroll max-h-32 w-full"
        onClick={(e) => handleClick(e)}
      >
        {inputQuery !== ""
          ? results.map((result) => {
              return (
                <div className="p-2 border-b border-slate-300 text-slate-950">
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
