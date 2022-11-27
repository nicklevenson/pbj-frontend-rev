import helpers from "../../global-helpers";

const SimilarTag = ({ tag }) => {
  return (
    <div className="inline-block bg-green-400 rounded p-2 m-2 text-white w-max">
      {helpers.titleize(tag)}
    </div>
  );
};

export default SimilarTag;
