import { useState } from "react";

const GenreSelection = ({ list, setGenresCallback }) => {
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
    <div className="w-64 mx-auto">
      <label htmlFor="genres filter">Genres</label>
      <br />
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
