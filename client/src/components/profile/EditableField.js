import React from "react";

const EditableField = ({
  labelName,
  placeholder,
  value,
  setNewFormValue,
  formKey,
}) => {
  return (
    <div>
      <label className="font-semibold" htmlFor={labelName}>
        {labelName}
      </label>
      <br />
      <input
        className="border border-solid rounded p-2 w-full"
        placeholder={placeholder}
        name={labelName}
        onChange={(e) => setNewFormValue(formKey, e.target.value)}
        value={value}
      />
    </div>
  );
};

export default EditableField;
