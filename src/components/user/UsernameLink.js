const UsernameLink = ({ userInfo }) => {
  return (
    <div className="card-header">
      <div
        // onClick={this.handleProfileClick}
        aria-label="go to user profile"
        className="user-profile-link"
      >
        {userInfo.username}
      </div>
      {/* <Links user={this.props.shownUser} /> */}
    </div>
  );
};

export default UsernameLink;
