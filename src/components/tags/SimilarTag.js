import helpers from "../../global-helpers";

const SimilarTag = ({ tag }) => {
  console.log(tag);
  return (
    <span className="bg-green-400 rounded p-2 mx-2 text-white">
      {helpers.titleize(tag)}
    </span>
  );
};

export default SimilarTag;
