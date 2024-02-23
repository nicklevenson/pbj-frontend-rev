import SimilarTag from "./SimilarTag";

const SimilarTags = ({ similarTags }) => {
  return (
    <div className="card-similarities flex flex-wrap gap-2 items-center">
      <b>You both like </b>
      {similarTags.map((tag) => (
        <SimilarTag tag={tag} key={Math.random() + tag} />
      ))}
    </div>
  );
};

export default SimilarTags;
