import React from "react";

const SearchableField = ({
  lableName,
  handleInputQuery,
  setInputQuery,
  inputQuery,
  setSelectedResult,
  formatResult,
  placeholder,
  results,
}) => {
  return (
    <div className="text-center w-[80%] mx-auto">
      <label className="font-bold">{lableName}</label>
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
export default SearchableField;
