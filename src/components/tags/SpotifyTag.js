const SpotifyTag = ({ tag }) => {
  return (
    <div className="flex-shrink-0 relative">
      <img
        className="w-28 h-28 object-cover"
        src={tag.imageUrl}
        alt="spotify-artist"
      ></img>
      <div className="absolute top-0 text-center text-white w-28 bg-gray-500 bg-opacity-25 h-28">
        {tag.name.substr(0, 35)}
        {tag.name.length > 36 ? "..." : null}
      </div>
    </div>
  );
};

export default SpotifyTag;
