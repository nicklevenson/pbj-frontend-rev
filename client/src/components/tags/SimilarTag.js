import helpers from "../../global-helpers";

const SimilarTag = ({ tag }) => {
  return (
    <div className="tag-teal">
      {helpers.titleize(tag)}
    </div>
  );
};

export default SimilarTag;
