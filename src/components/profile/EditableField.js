import React from "react";

const EditableField = ({ labelName, placeholder, value, setValue }) => {
  return (
    <div className="text-center w-[80%] mx-auto">
      <label className="font-bold" htmlFor={labelName}>
        {labelName}
      </label>
      <br />
      <input
        className="border border-solid rounded p-2 w-full"
        placeholder={placeholder}
        name={labelName}
        onChange={setValue}
        value={value}
      />
    </div>
  );
};

export default EditableField;
