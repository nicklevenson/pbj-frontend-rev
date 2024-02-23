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
    <div>
      <label className="font-semibold">{lableName}</label>
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
      <div className="bg-slate-200 text-left overflow-y-scroll max-h-32 w-full absolute z-10">
        {inputQuery !== ""
          ? results.map((result) => {
              return (
                <div
                  className="p-2 border-b border-slate-300"
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
