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
    <div className=" w-[80%] mx-auto">
      <label className="font-bold" htmlFor="Generics filter">
        Other Interests
      </label>
      <br />
      <div className="flex">
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
        
        {submitable ? <button className="ml-1 bg-green-300 p-2 rounded" onClick={() => setGenericsCallback(inputQuery)}>Add</button> : null}
      </div>
      <div
        onClick={(e) => handleClick(e)}
        className="bg-gray-200 text-left overflow-y-scroll max-h-32 w-full"
      >
        {inputQuery !== ""
          ? results.map((result) => {
              return (
                <div className="p-2  border-b broder border-gray-300">
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
