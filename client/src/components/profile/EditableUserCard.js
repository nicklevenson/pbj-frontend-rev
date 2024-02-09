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
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useState } from "react";
import EditModal from "./EditModal";
import EditPhoto from "./EditPhoto";
import UserApi from "../../api/user-api";
import { useOutletContext } from "react-router-dom";

const EditableUserCard = () => {
  const { currentUser, attemptFetchUser } = useOutletContext();
  const [editModal, setEditModal] = useState(false);
  const connections = currentUser.connections;
  const { instruments, genres, spotify, generic } = currentUser.tags;
  const { incognito } = currentUser;

  const handleIncogneto = (value) => {
    UserApi.updateUser({
      incognito: value
    }).then(() => {
      attemptFetchUser();
    });
  } 

  return (
    <div className="max-w-[600px] mx-auto">
      <div>
        <div>
          <UserPhoto userInfo={currentUser} />
          <EditPhoto />
        </div>
        <div className="mx-2 my-4">
          <div className="flex">
            <UsernameLink userInfo={currentUser} />
            <span
              className="ml-auto"
              onClick={() => setEditModal((prev) => !prev)}
            >
              <MdOutlineModeEdit size={"2rem"} />
            </span>
          </div>
          {editModal && <EditModal setEditModal={setEditModal} />}
          <ConnectedUsers connections={connections} />
          <LocationBanner location={currentUser.location} distance={"0"} />
          <div className="my-6"></div>
          <Bio bio={currentUser.bio} />
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
      <div className="font-bold mx-2">
        {incognito ?
          <div className="flex">
            <span className="mr-1 mt-1">Incognito mode</span>
            <span><FaToggleOn size={"2rem"} onClick={() => handleIncogneto(false)} /></span>
          </div>
          :
          <div className="flex">
            <span className="mr-1 mt-1">Incognito mode</span>
            <span><FaToggleOff size={"2rem"} onClick={() => handleIncogneto(true)} /></span>
          </div>
        }
        <span className="text-xs italic font-normal">User will not be able to see your profile when in incognito mode</span>
      </div>
    </div>
  );
};

export default EditableUserCard;
