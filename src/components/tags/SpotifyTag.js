const SpotifyTag = ({ tag }) => {
  return (
    <div className="relative">
      <img
        className="w-28 h-28 object-cover"
        src={tag.image_url}
        alt="spotify-artist"
      ></img>
      <div className="absolute top-2 text-center text-white text-xl w-28">
        {tag.name.substr(0, 35)}
        {tag.name.length > 36 ? "..." : null}
      </div>
    </div>
  );
};

export default SpotifyTag;
