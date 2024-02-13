
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import EditableField from "../profile/EditableField";
import LocationField from "../profile/LocationField";
import Div100vh from 'react-div-100vh'

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
    <Div100vh className="z-20 fixed top-0 left-0 w-full">
      <div className="flex flex-col bg-white relative z-50 h-full overflow-y-scroll">
        <section className="flex-1">
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
        </section>

        <section className="xfixed bottom-0 left-0 w-full bg-slate-100 p-4">
          <div className="flex flex-col gap-4">
            <button
              className="bg-green-500 text-white rounded p-2 hover:bg-green-700"
              onClick={() => {
                navigate("/welcome");
              }}
            >
              Go Back
            </button>

            <button className={`${formDisabled ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded p-2`}
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
        </section>

      </div>
    </Div100vh>
  );
}

export default WelcomeStepOne;