const FilterSelections = ({ selections, heading, removeCallback }) => {
  return (
    selections.length > 0 && (
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">{heading}</div>
        <div className="flex gap-2 items-center flex-wrap">
          {selections.map((selection) => {
            return (
              <div key={selection} className="tag-blue">
                <div className="pt-1">{selection}</div>
                <button className="px-2" onClick={() => removeCallback(selection)}>x</button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default FilterSelections;
