import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import EditableField, { editableField } from "./EditableField";
import LocationField from "./LocationField";

const EditModal = ({ setEditModal }) => {
  const { currentUser } = useOutletContext();

  const [formValues, setFormValues] = useState({
    location: null,
    lat: null,
    lng: null,
    bio: null,
    genres: [],
    instruments: [],
    otherTags: [],
    spotifyLink: null,
    soundcloudLink: null,
    bandcampLink: null,
    instagramLink: null,
    appleMusicLink: null,
  });

  const setNewFormValue = (key, newValue) => {
    setFormValues((prev) => {
      const newValues = prev;
      newValues[key] = newValue;
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
    appleMusicLink,
  } = currentUser;

  const { instruments, genres, generic } = currentUser.tags;

  const newLocation = formValues.location;

  return (
    <div className="absolute inset-0 bg-gray-200 w-full h-full z-10">
      <div onClick={() => setEditModal((prev) => !prev)}>
        <BsChevronLeft size={"2rem"} />
      </div>
      <div>
        <EditableField labelName="Username" placeholder={username} />
        <LocationField
          placeholder={location}
          setNewFormValue={setNewFormValue}
        />
        <EditableField labelName="Bio" placeholder={bio} />

        <label>
          Instruments
          <input />
        </label>

        <label>
          Genres
          <input />
        </label>

        <label>
          Other interests
          <input />
        </label>

        <EditableField
          labelName="Link to your spotify page"
          placeholder={spotifyLink}
        />
        <EditableField
          labelName="Link to your soundcloud"
          placeholder={soundcloudLink}
        />
        <EditableField
          labelName="Link to your bandcamp"
          placeholder={bandcampLink}
        />
        <EditableField
          labelName="Link to your instagram"
          placeholder={instagramLink}
        />
        <EditableField
          labelName="Link to your apple music"
          placeholder={appleMusicLink}
        />
      </div>
    </div>
  );
};

export default EditModal;
