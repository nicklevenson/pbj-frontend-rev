import GenericTag from "./GenericTag";

const GenericTags = ({ genericTags }) => {
  return (
    <div className="card-interests card-tags">
      <b>Other Interests:</b>
      {genericTags.map((tag) => {
        return <GenericTag tag={tag.name} key={Math.random() + tag.name} />;
      })}
    </div>
  );
};

export default GenericTags;
