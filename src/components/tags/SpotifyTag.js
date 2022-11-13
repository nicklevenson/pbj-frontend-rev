const SpotifyTag = ({ tag }) => {
  return (
    <div className="generic-tag spotify-artist-tag">
      <img
        className="artist-image"
        src={tag.image_url}
        alt="spotify-artist"
      ></img>
      <div className="artist-name">
        {tag.name.substr(0, 35)}
        {tag.name.length > 36 ? "..." : null}
      </div>
    </div>
  );
};

export default SpotifyTag;
