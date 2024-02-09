import React, { useState, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import EditableField from "./EditableField";
import LocationField from "./LocationField";
import InstrumentSelection from "../shared/InstrumentSelection";
import GenericSelection from "../shared/GenericSelection";
import GenreSelection from "../shared/GenreSelection";
import ListsApi from "../../api/lists_api";
import GenericTag from "../tags/GenericTag";
import UserApi from "../../api/user-api";

const EditModal = ({ setEditModal }) => {
  const { currentUser, attemptFetchUser } = useOutletContext();

  const [formValues, setFormValues] = useState({
    location: null,
    lat: null,
    lng: null,
    bio: null,
    spotifyLink: null,
    soundcloudLink: null,
    bandcampLink: null,
    instagramLink: null,
    appleMusicLink: null
  });

  const setNewFormValue = (key, newValue) => {
    setFormValues((prev) => {
      const newValues = prev;
      newValues[key] = newValue;
      console.log(newValues);
      return newValues;
    });
  };

  const {
    username,
    location,
    bio,
    spotifyLink,
    soundcloudLink,
    bandcampLink,
    instagramLink,
    appleMusicLink
  } = currentUser;

  const { instruments, genres, generic } = currentUser.tags;

  const [instrumentsList, setInstrumentsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [genericList, setGenericList] = useState([]);

  const setInstrumentsCallback = (instrument) => {
    updateTag(instrument, "instrument", "add");
  };

  const setGenresCallback = (genre) => {
    updateTag(genre, "genre", "add");
  };

  const setGenericCallback = (tag) => {
    updateTag(tag, "generic", "add");
  };

  const setLists = async () => {
    const list = await ListsApi.getTagList();

    setInstrumentsList(list.instruments);
    setGenresList(list.genres);
    setGenericList(list.generic);
  };

  useLayoutEffect(() => {
    setLists();
  }, []);
  

  const updateTag = (name, kind, action) => {
    UserApi.updateTag(name, kind, action)
      .then(() => {
        attemptFetchUser();
      }
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-200 w-full h-full z-10 overflow-y-scroll pb-16">
      <div onClick={() => setEditModal((prev) => !prev)}>
        <BsChevronLeft size={"2rem"} />
      </div>
      <div>
        <EditableField
          labelName="Username"
          placeholder={username}
          formKey="username"
          setNewFormValue={setNewFormValue}
          value={formValues.username}
        />
        <LocationField
          placeholder={location}
          setNewFormValue={setNewFormValue}
        />
        <EditableField
          labelName="Bio"
          placeholder={bio}
          formKey="bio"
          setNewFormValue={setNewFormValue}
          value={formValues.bio}
        />

        <InstrumentSelection
          list={instrumentsList.filter((i) => !instruments.includes(i))}
          setInstrumentsCallback={setInstrumentsCallback}
          sumbitable={true}
        />

        <div className="w-[80%] mx-auto">
          {instruments.map((inst) => {
            return <GenericTag tag={inst.name} key={Math.random() + inst.name} editable={true} removeTag={() =>
              updateTag(inst.name, "instrument", "remove")
            } />;
          })}
        </div>

        <GenreSelection
          list={genresList.filter((g) => !genres.includes(g))}
          setGenresCallback={setGenresCallback}
          submitable={true}
        />

        <div className="w-[80%] mx-auto">
          {genres.map((genre) => {
            return <GenericTag tag={genre.name} key={Math.random() + genre.name} editable={true} removeTag={() =>
              updateTag(genre.name, "genre", "remove")
            } />;
          })}
        </div>

        <GenericSelection
          list={genericList.filter((g) => !generic.includes(g))}
          setGenericsCallback={setGenericCallback}
          submitable={true}
        />
          
        <div className="w-[80%] mx-auto">
          {generic.map((gen) => {
            return <GenericTag tag={gen.name} key={Math.random() + gen.name} editable={true} removeTag={() =>
              updateTag(gen.name, "generic", "remove")
            } />;
          })}
        </div>

        <EditableField
          labelName="Link to your spotify page"
          placeholder={spotifyLink}
          formKey="spotifyLink"
          setNewFormValue={setNewFormValue}
          value={formValues.spotifyLink}
        />
        <EditableField
          labelName="Link to your soundcloud"
          placeholder={soundcloudLink}
          formKey="soundcloudLink"
          setNewFormValue={setNewFormValue}
          value={formValues.soundcloudLink}
        />
        <EditableField
          labelName="Link to your bandcamp"
          placeholder={bandcampLink}
          formKey="bandcampLink"
          setNewFormValue={setNewFormValue}
          value={formValues.bandcampLink}
        />
        <EditableField
          labelName="Link to your instagram"
          placeholder={instagramLink}
          formKey="instagramLink"
          setNewFormValue={setNewFormValue}
          value={formValues.instagramLink}
        />
        <EditableField
          labelName="Link to your apple music"
          placeholder={appleMusicLink}
          formKey="appleMusicLink"
          setNewFormValue={setNewFormValue}
          value={formValues.appleMusicLink}
        />
 
      </div>

      <div className="fixed z-[10000] bottom-4 w-full flex">
        <button className="bg-blue-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            UserApi.updateUser(formValues).then(() => {
              setEditModal((prev) => !prev);
              attemptFetchUser();
            });
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditModal;
