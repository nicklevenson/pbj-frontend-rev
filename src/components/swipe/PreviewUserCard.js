import GenericTag from "../tags/GenericTag";
import SpotifyTag from "../tags/SpotifyTag";

const PreviewUserCard = ({ currentUser, shownUser }) => {
  console.log(shownUser);
  const { photo, providerImage, username, location, bio } = shownUser.info;
  const connections = shownUser.connections;
  const { instruments, genres, spotify, generic } = shownUser.tags;
  return (
    <div>
      <div>
        <div className="">
          <img
            className=""
            src={
              photo ||
              providerImage ||
              `${process.env.REACT_APP_BACKEND_URL}/userDefault.png`
            }
            alt="User"
          />
        </div>

        <div className="card-info">
          <div className="card-header">
            <div
              // onClick={this.handleProfileClick}
              aria-label="go to user profile"
              className="user-profile-link"
            >
              {username}
            </div>
            {/* <Links user={this.props.shownUser} /> */}
          </div>
          <div className="card-connections">
            <button
            // onClick={this.toggleConnectionsModal}
            >
              {/* <Icon name="user" /> */}
              {connections.connected_users.length || "0"} Connections
            </button>
          </div>
          {
            <div className="card-location">
              <span className="location">Location: {location || "Earth"}</span>
            </div>
          }
          {/* {this.renderSimilarTags()} */}
          <div className="card-bio">{bio ? bio : "I'm a musician!"}</div>
          <div className="card-tags">
            {instruments.length > 0 ? (
              <>
                <b>Plays: </b>
                {instruments?.map((inst) => {
                  return (
                    <GenericTag
                      tag={inst.name}
                      key={Math.random() + inst.name}
                    />
                  );
                })}
              </>
            ) : null}
          </div>
          {spotify.length > 0 ? (
            <>
              <br />
              <div className="card-artists">
                <b>Top Artists: </b>
                <div className="card-artists-container">
                  {spotify.map((tag) => {
                    return (
                      <SpotifyTag tag={tag} key={Math.random() + tag.name} />
                    );
                  })}
                </div>
              </div>
              <br />
            </>
          ) : null}
          <div className="card-tags">
            {genres.length > 0 ? (
              <>
                <b>Genres: </b>
                {genres?.map((genre) => {
                  return (
                    <GenericTag
                      tag={genre.name}
                      key={Math.random() + genre.name}
                    />
                  );
                })}
                <br />
              </>
            ) : null}
          </div>
          {generic.length > 0 ? (
            <div className="card-interests card-tags">
              <b>Other Interests:</b>
              {generic.map((tag) => {
                return (
                  <GenericTag tag={tag.name} key={Math.random() + tag.name} />
                );
              })}
            </div>
          ) : null}{" "}
        </div>
      </div>
    </div>
  );
};

export default PreviewUserCard;
