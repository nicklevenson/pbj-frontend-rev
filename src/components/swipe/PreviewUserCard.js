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

const PreviewUserCard = ({ shownUser }) => {
  console.log(shownUser);
  const info = shownUser.info;
  const distance = shownUser.distance;
  const connections = shownUser.connections;
  const {
    instruments,
    genres,
    spotify,
    generic,
    similar_tags,
  } = shownUser.tags;

  return (
    <div>
      <div>
        <UserPhoto userInfo={info} />

        <div className="mx-2 my-4">
          <UsernameLink userInfo={info} />
          <ConnectedUsers connections={connections} />
          <LocationBanner location={info.location} distance={distance} />
          <div className="my-6"></div>
          <Bio bio={info.bio} />
          <div className="my-6"></div>
          <SimilarTags similarTags={similar_tags} />
          <div className="my-6"></div>
          <Instruments instruments={instruments} />
          <div className="my-6"></div>
          <SpotifyTags spotifyTags={spotify} />
          <div className="my-6"></div>
          <GenreTags genres={genres} />
          <div className="my-6"></div>
          <GenericTags genericTags={generic} />
        </div>
      </div>
    </div>
  );
};

export default PreviewUserCard;
