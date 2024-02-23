import React, { useState, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import Div100vh from "react-div-100vh";
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
    <Div100vh className="z-10 overflow-y-scroll fixed top-0 left-0 w-full bg-slate-50">
      <div className="pt-12">
        <div className="inner-container py-3">
          <div className="flex gap-4 items-center justify-start">
            <div className="-ml-3" onClick={() => setEditModal((prev) => !prev)}>
              <BsChevronLeft size={"2rem"} />
            </div>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
        </div>

        <div className="inner-container pt-2">
          <div className="flex flex-col gap-6">
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

            <div className="flex flex-col gap-2">
              <InstrumentSelection
                list={instrumentsList.filter((i) => !instruments.includes(i))}
                setInstrumentsCallback={setInstrumentsCallback}
                submitable={true}
              />

              <div className="flex gap-2 flex-wrap">
                {instruments.map((inst) => {
                  return (
                    <GenericTag
                      tag={inst.name}
                      key={Math.random() + inst.name}
                      editable={true}
                      removeTag={() =>
                        updateTag(inst.name, "instrument", "remove")
                      }
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <GenreSelection
                list={genresList.filter((g) => !genres.includes(g))}
                setGenresCallback={setGenresCallback}
                submitable={true}
              />

              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => {
                  return (
                    <GenericTag
                      tag={genre.name}
                      key={Math.random() + genre.name}
                      editable={true}
                      removeTag={() => updateTag(genre.name, "genre", "remove")}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <GenericSelection
                list={genericList.filter((g) => !generic.includes(g))}
                setGenericsCallback={setGenericCallback}
                submitable={true}
              />

              <div className="flex gap-2 flex-wrap">
                {generic.map((gen) => {
                  return (
                    <GenericTag
                      tag={gen.name}
                      key={Math.random() + gen.name}
                      editable={true}
                      removeTag={() => updateTag(gen.name, "generic", "remove")}
                    />
                  );
                })}
              </div>
            </div>

            <EditableField
              labelName="Link to your Spotify page"
              placeholder={spotifyLink}
              formKey="spotifyLink"
              setNewFormValue={setNewFormValue}
              value={formValues.spotifyLink}
            />
            <EditableField
              labelName="Link to your SoundCloud"
              placeholder={soundcloudLink}
              formKey="soundcloudLink"
              setNewFormValue={setNewFormValue}
              value={formValues.soundcloudLink}
            />
            <EditableField
              labelName="Link to your Bandcamp"
              placeholder={bandcampLink}
              formKey="bandcampLink"
              setNewFormValue={setNewFormValue}
              value={formValues.bandcampLink}
            />
            <EditableField
              labelName="Link to your Instagram"
              placeholder={instagramLink}
              formKey="instagramLink"
              setNewFormValue={setNewFormValue}
              value={formValues.instagramLink}
            />
            <EditableField
              labelName="Link to your Apple Music"
              placeholder={appleMusicLink}
              formKey="appleMusicLink"
              setNewFormValue={setNewFormValue}
              value={formValues.appleMusicLink}
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white bg-opacity-90">
          <div className="inner-container">
            <div className="max-w-[350px] mx-auto flex gap-4">
              <button
                className="flex-1 button-blue"
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
        </div>
      </div>
    </Div100vh>
  );
};

export default EditModal;
