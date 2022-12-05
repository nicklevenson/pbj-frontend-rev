const FilterSelections = ({ selections, heading, removeCallback }) => {
  return (
    selections.length > 0 && (
      <div className="m-2">
        <div className="text-xl font-bold">{heading}</div>
        <div className="flex justify-center flex-wrap">
          {selections.map((selection) => {
            return (
              <div
                key={selection}
                className="bg-gray-200 w-max p-2 rounded m-2"
              >
                {selection}
                {"  "}
                <button onClick={() => removeCallback(selection)}>X</button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default FilterSelections;
