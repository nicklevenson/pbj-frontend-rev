import { useState } from "react";

const GenericSelection = ({ list, setGenericsCallback, submitable=false}) => {
  const [inputQuery, setInputQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = (e) => {
    const selection = e.target.innerText;
    setGenericsCallback(selection);
    setResults([]);
    setInputQuery("");
  };

  const handleInputQuery = (e) => {
    setInputQuery(e.target.value);
    const filteredGenerics = list
      .filter((generic) => {
        return generic.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .splice(0, 30);
    setResults(filteredGenerics);
  };

  return (
    <div>
      <label className="font-semibold" htmlFor="Generics filter">
        Other Interests
      </label>
      <br />
      <div className="flex gap-2">
        <input
          name="generics filter"
          className="border border-solid rounded p-2 w-full"
          placeholder="Search for interests"
          value={inputQuery}
          onInput={(e) => handleInputQuery(e)}
          aria-label="generic search"
          autoComplete="off"
          type="text"
          />
        
        {submitable ? <button className="button-blue px-6" onClick={() => setGenericsCallback(inputQuery)}>Add</button> : null}
      </div>
      <div
        onClick={(e) => handleClick(e)}
        className="bg-slate-200 text-left overflow-y-scroll max-h-32 w-full"
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

export default GenericSelection;
