import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const EditPhotoModal = (props) => {
  const { currentUser, attemptFetchUser } = useOutletContext();
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    updatePhoto();
  }, [photo]);

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      console.log(file.size)
      if (file.size < 3000000) {
        setPhotoError(null);
        setPhoto(file);
      } else {
        setPhotoError("File size too large");
      }
    }
  };

  const updatePhoto = () => {
    if (photo) {
      setUploading(true);
      const formData = new FormData();
      formData.append("photo", photo);
      const userId = sessionStorage.userId;
      const configObj = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt} ${userId}`,
          Accept: "application/json",
          enctype: "multipart/form-data",
        },
        body: formData,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/upload_photo`,
        configObj
      )
        .then((res) => res.json())
        .then((json) => {
          setUploading(false);
          attemptFetchUser();
        })
        .catch((error) => {
          console.warn("Error uploading: \n", error);
          setUploading(false);
          setPhotoError("Error uploading photo");
        });
    }
  };

    return (
      <div className="relative">
        <form className="absolute bottom-0 bg-gray-300 w-full text-center py-2">
          <label htmlFor="img">
            {photoError
              ? photoError
              : uploading
              ? "Uploading..."
              : "Upload New Photo"}
          </label>
          <input
            className="ml-8 hidden"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={(e) => handlePhotoUpload(e)}
            disabled={uploading ? true : false}
          />
        </form>
      </div>
    );
}

export default EditPhotoModal;

