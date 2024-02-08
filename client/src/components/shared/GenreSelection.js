import { useState } from "react";

const GenreSelection = ({ list, setGenresCallback, title="Genres", submitable=false }) => {
  const [inputQuery, setInputQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = (e) => {
    const selection = e.target.innerText;
    setGenresCallback(selection);
    setResults([]);
    setInputQuery("");
  };

  const handleInputQuery = (e) => {
    setInputQuery(e.target.value);
    const filteredGenres = list
      .filter((genre) => {
        return genre.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .splice(0, 30);
    setResults(filteredGenres);
  };

  return (
    <div className="w-[80%] mx-auto">
      <label className="font-bold" htmlFor="genres filter">
        {title}
      </label>
      <br />
      <div className="flex">
        <input
          name="genres filter"
          className="border border-solid rounded p-2 w-full"
          placeholder="Search for Genres"
          value={inputQuery}
          onInput={(e) => handleInputQuery(e)}
          aria-label="genre search"
          autoComplete="off"
          type="text"
        />


        {submitable ? <button className="ml-1 bg-green-300 p-2 rounded" onClick={() => setGenresCallback(inputQuery)}>Add</button> : null}
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

export default GenreSelection;
