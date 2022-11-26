const UserPhoto = ({ userInfo }) => {
  return (
    <div>
      <img
        className="w-full"
        src={
          userInfo.photo ||
          userInfo.providerImage ||
          `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
        }
        alt="User"
      />
    </div>
  );
};

export default UserPhoto;
