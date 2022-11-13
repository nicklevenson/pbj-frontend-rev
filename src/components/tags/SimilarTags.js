import SimilarTag from "./SimilarTag";

const SimilarTags = ({ similarTags }) => {
  return (
    <div className="card-similarities">
      <b>You both like: </b>
      {similarTags.map((tag) => (
        <SimilarTag tag={tag} key={Math.random() + tag} />
      ))}
    </div>
  );
};

export default SimilarTags;
