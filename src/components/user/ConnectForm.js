const ConnectForm = ({
  currentUser,
  shownUser,
  handleMessageLink,
  handleConnectionRequest,
  handleConnectionAccept,
  handleConnectionReject,
}) => {
  const isPendingOutgoingRequest = () => {
    return currentUser.connections.pending_connections
      .map((u) => u.id)
      .includes(shownUser.info.id);
  };

  const isPendingIncomingRequest = () => {
    return currentUser.connections.incoming_connections
      .map((user) => user.id)
      .includes(shownUser.info.id);
  };

  const isAlreadyConnected = () => {
    return currentUser.connections.connected_users
      .map((user) => user.id)
      .includes(shownUser.info.id);
  };

  const noConnection = () => {
    return (
      !isPendingOutgoingRequest() &&
      !isPendingIncomingRequest() &&
      !isAlreadyConnected()
    );
  };

  return (
    <div>
      {isPendingOutgoingRequest() && (
        <button disabled className="ui button secondary disabled">
          Pending
        </button>
      )}
      {isPendingIncomingRequest() && (
        <>
          {/* <h5>{this.props.shownUser.username} has requested to connect</h5> */}
          <button
            className="ui button secondary"
            onClick={handleConnectionAccept}
          >
            Accept
          </button>
          <button
            className="ui button secondary"
            onClick={handleConnectionReject}
          >
            Reject
          </button>
        </>
      )}
      {isAlreadyConnected() && (
        <button
          className="message-user-button ui button secondary"
          onClick={handleMessageLink}
        >
          Message
        </button>
      )}
      {noConnection() && (
        <button
          onClick={handleConnectionRequest}
          className="ui button secondary"
        >
          Let's Jam!
        </button>
      )}
    </div>
  );
};

export default ConnectForm;
