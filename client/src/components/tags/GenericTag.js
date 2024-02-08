import helpers from "../../global-helpers";

const GenericTag = ({ tag, editable, removeTag }) => {
  return (
    <span className="bg-blue-300 rounded p-2 mx-2 my-1 text-white inline-block">
      {helpers.titleize(tag)}
      {editable ? (
        <button
          className="ml-2  text-black"
          onClick={(e) => removeTag(e, tag)}
          aria-label="remove this item"
        >
          X
        </button>
      ) : null}
    </span>
  );
};

export default GenericTag;
