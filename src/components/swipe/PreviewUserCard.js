import SimilarTags from "../tags/SimilarTags";
import Instruments from "../tags/Instruments";
import SpotifyTags from "../tags/SpotifyTags";
import GenreTags from "../tags/GenreTags";
import GenericTags from "../tags/GenericTags";
import UserPhoto from "../user/UserPhoto";
import UsernameLink from "../user/UsernameLink";
import ConnectedUsers from "../user/ConnectedUsers";
import LocationBanner from "../user/LocationBanner";
import Bio from "../user/Bio";

const PreviewUserCard = ({ shownUser, showSimilar = true }) => {
  const info = shownUser.info;
  const distance = shownUser.distance;
  const connections = shownUser.connections;
  const { instruments, genres, spotify, generic, similarTags } = shownUser.tags;

  return (
    <div className="max-w-[600px] mx-auto">
      <div>
        <UserPhoto userInfo={info} />

        <div className="mx-2 my-4">
          <UsernameLink userInfo={info} />
          <ConnectedUsers connections={connections} />
          <LocationBanner location={info.location} distance={distance} />
          <div className="my-6"></div>
          <Bio bio={info.bio} />
          <div className="my-6"></div>
          {similarTags.length > 0 && showSimilar && <SimilarTags similarTags={similarTags} />}
          <div className="my-6"></div>
          {instruments.length > 0 && <Instruments instruments={instruments} />}
          <div className="my-6"></div>
          {spotify.length > 0 && <SpotifyTags spotifyTags={spotify} />}
          <div className="my-6"></div>
          {genres.length > 0 && <GenreTags genres={genres} />}
          <div className="my-6"></div>
          {generic.length > 0 && <GenericTags genericTags={generic} />}
        </div>
      </div>
    </div>
  );
};

export default PreviewUserCard;
