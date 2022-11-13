import GenericTag from "./GenericTag";

const GenreTags = ({ genres }) => {
  return (
    <div className="card-tags">
      <b>Genres: </b>
      {genres.map((genre) => {
        return <GenericTag tag={genre.name} key={Math.random() + genre.name} />;
      })}
    </div>
  );
};

export default GenreTags;
