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
import ConnectForm from "../user/ConnectForm";

const PreviewUserCard = ({
  currentUser,
  shownUser,
  handleConnectionAccept,
  handleConnectionReject,
  handleConnectionRequest,
  handleMessageLink,
}) => {
  console.log(currentUser);
  const info = shownUser.info;
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

        <div className="card-info">
          <UsernameLink userInfo={info} />
          <ConnectedUsers connections={connections} />
          <LocationBanner location={info.location} />
          <Bio bio={info.bio} />
          <SimilarTags similarTags={similar_tags} />
          <Instruments instruments={instruments} />
          <SpotifyTags spotifyTags={spotify} />
          <GenreTags genres={genres} />
          <GenericTags genericTags={generic} />
        </div>
      </div>
    </div>
  );
};

export default PreviewUserCard;
