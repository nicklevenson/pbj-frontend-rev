const UserPhoto = ({ userInfo }) => {
  return (
    <div className="">
      <img
        className=""
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
