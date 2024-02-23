import helpers from "../../global-helpers";

const GenericTag = ({ tag, editable, removeTag }) => {
  return (
    <span className="tag-blue">
      <div className="pt-1">{helpers.titleize(tag)}</div>
      {editable ? (
        <button
          className="px-2"
          onClick={(e) => removeTag(e, tag)}
          aria-label="remove this item"
        >
          x
        </button>
      ) : null}
    </span>
  );
};

export default GenericTag;
