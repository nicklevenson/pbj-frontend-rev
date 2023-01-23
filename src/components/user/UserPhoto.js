const UserPhoto = ({ userInfo }) => {
  return (
    <img
      className="w-full"
      src={
        userInfo.photo ||
        userInfo.providerImage ||
        `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
      }
      alt="User"
    />
  );
};

export default UserPhoto;
