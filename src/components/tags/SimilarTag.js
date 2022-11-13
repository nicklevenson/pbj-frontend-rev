import helpers from "../../global-helpers";

const SimilarTag = ({ tag }) => {
  console.log(tag);
  return <div className="generic-tag similar-tag">{helpers.titleize(tag)}</div>;
};

export default SimilarTag;
