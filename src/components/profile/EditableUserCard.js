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
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import EditModal from "./EditModal";

const EditableUserCard = ({ user }) => {
  const [editModal, setEditModal] = useState(false);
  const connections = user.connections;
  const { instruments, genres, spotify, generic } = user.tags;

  return (
    <div>
      <div>
        <UserPhoto userInfo={user} />
        <div className="mx-2 my-4">
          <div className="flex">
            <UsernameLink userInfo={user} />
            <span
              className="ml-auto"
              onClick={() => setEditModal((prev) => !prev)}
            >
              <MdOutlineModeEdit size={"2rem"} />
            </span>
          </div>
          {editModal && <EditModal setEditModal={setEditModal} />}
          <ConnectedUsers connections={connections} />
          <LocationBanner location={user.location} distance={0} />
          <div className="my-6"></div>
          <Bio bio={user.bio} />
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

export default EditableUserCard;
