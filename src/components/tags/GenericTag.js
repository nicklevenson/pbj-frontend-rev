import helpers from "../../global-helpers";

const GenericTag = ({ tag, editable, removeTag }) => {
  return (
    <div className="generic-tag">
      {helpers.titleize(tag)}
      {editable ? (
        <button
          className="delete-button"
          onClick={(e) => removeTag(e, tag)}
          aria-label="remove this item"
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default GenericTag;
