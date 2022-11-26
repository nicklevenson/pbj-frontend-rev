import SpotifyTag from "./SpotifyTag";

const SpotifyTags = ({ spotifyTags }) => {
  return (
    <div className="card-artists">
      <b>Top Artists </b>
      <div className="card-artists-container">
        {spotifyTags.map((tag) => {
          return <SpotifyTag tag={tag} key={Math.random() + tag.name} />;
        })}
      </div>
    </div>
  );
};

export default SpotifyTags;
