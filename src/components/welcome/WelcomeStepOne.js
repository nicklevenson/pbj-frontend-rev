
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import EditableField from "../profile/EditableField";
import LocationField from "../profile/LocationField";

const WelcomeStepOne = () => {
  const { currentUser, attemptFetchUser } = useOutletContext();
  const navigate = useNavigate();

  const [formDisabled, setFormDisabled] = useState(true);
  const [formValues, setFormValues] = useState({
    username: "",
    location: "",
    lat: null,
    lng: null,
    bio: ""
  });

  const setNewFormValue = (key, newValue) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: newValue
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      setFormDisabled(isFormDisabled());
    }
  }, [currentUser, formValues]);

  if (!currentUser) return null;

  const {
    username,
    location,
    bio,
  } = currentUser;


  const isFormDisabled = () => {
    console.log(username, formValues.username)
    console.log(location, formValues.location)
    console.log(bio, formValues.bio)
    return (
      (!username && formValues.username === "") ||
      (!location && formValues.location === "") ||
      (!bio && formValues.bio === "")
    )
  }

  return (        
    <div className="absolute inset-0 bg-gray-200 w-full z-10 overflow-y-scroll pb-28 px-4">
      <h1 className="mt-8 text-2xl font-bold mb-4 text-center">Let's get some peanut butter on that sandwich</h1>
      <div>
        <div className="my-8"></div>
        <EditableField
          labelName="Username"
          placeholder={username}
          formKey="username"
          setNewFormValue={setNewFormValue}
          value={formValues.username}
        />
        <div className="my-8"></div>
        <LocationField
          placeholder={location}
          setNewFormValue={setNewFormValue}
        />
        <div className="my-8"></div>
        <EditableField
          labelName="Bio"
          placeholder={bio}
          formKey="bio"
          setNewFormValue={setNewFormValue}
          value={formValues.bio}
        />
      </div>

       <div className="fixed z-[10000] bottom-16 w-full flex">
        <button
          className="bg-green-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            navigate("/welcome");
          }}
        >
          Go Back
        </button>
      </div>

      <div className="fixed z-[10000] bottom-4 mt-4 w-full flex">
        <button className={`${formDisabled ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded p-2 w-[80%] mx-auto`}
          onClick={() => {
            UserApi.updateUser(formValues).then(() => {
              attemptFetchUser();
              navigate("/welcome/step2");
            });
          }}
          disabled={formDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WelcomeStepOne;