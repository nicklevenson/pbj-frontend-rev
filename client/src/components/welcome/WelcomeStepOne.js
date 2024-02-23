import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Div100vh from "react-div-100vh";
import EditableField from "../profile/EditableField";
import LocationField from "../profile/LocationField";
import UserApi from "../../api/user-api";

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

  console.log(currentUser)

  const isFormDisabled = () => {
    console.log(username, formValues.username)
    console.log(location, formValues.location)
    console.log(bio, formValues.bio)
    return (
      (!formValues.lat || !formValues.lng) || // (location is not set yet
      (!username && formValues.username === "") ||
      (!location && formValues.location === "") ||
      (!bio && formValues.bio === "")
    )
  }

  return (
    <Div100vh className="z-10 overflow-y-scroll fixed top-0 left-0 w-full bg-white">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-animation pt-12">
          <div className="inner-container flex items-end justify-start">
            <h1 className="text-white text-xl font-bold">
              Let's get some peanut butter on that sandwich
            </h1>
          </div>
        </div>

        <div className="flex-1">
          <div className="inner-container flex flex-col gap-8">
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
          </div>
        </div>

        <div>
          <div className="inner-container">
            <div className="max-w-[350px] mx-auto flex gap-4">
              <button
                className="flex-1 button-outlined"
                onClick={() => {
                  navigate("/welcome");
                }}
              >
                Go Back
              </button>

              <button
                className={formDisabled ? "flex-1 button-disabled" : "flex-1 button-blue"}
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
        </div>
      </div>
    </Div100vh>
  );
};

export default WelcomeStepOne;
