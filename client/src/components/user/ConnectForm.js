const ConnectForm = ({
  currentUser,
  shownUser,
  handleMessageLink,
  handleConnectionRequest,
  handleConnectionAccept,
  handleConnectionReject,
}) => {
  const isPendingOutgoingRequest = () => {
    return shownUser.connectionStatus === "pending";
  };

  const isPendingIncomingRequest = () => {
    return shownUser.connectionStatus === "incoming request";
  };

  const isAlreadyConnected = () => {
    return shownUser.connectionStatus === "connected";
  };

  const noConnection = () => {
    return shownUser.connectionStatus === "unconnected";
  };

  return (
    <div>
      {isPendingOutgoingRequest() && (
        <button
          disabled
          className="button-disabled"
        >
          Pending
        </button>
      )}
      {isPendingIncomingRequest() && (
        <div className="flex gap-8">
          {/* <h5>{this.props.shownUser.username} has requested to connect</h5> */}
          <button
            className="button-indigo flex-1 px-5"
            onClick={handleConnectionAccept}
          >
            Accept
          </button>
          {/* <button
            className="button-indigo flex-1 px-5"
            onClick={handleConnectionReject}
          >
            Reject
          </button> */}
        </div>
      )}
      {isAlreadyConnected() && (
        <button
          onClick={handleMessageLink}
          className="button-indigo flex-1 px-5"
        >
          Message
        </button>
      )}
      {noConnection() && (
        <button
          onClick={handleConnectionRequest}
          className="button-indigo flex-1 px-5"
        >
          Jam!
        </button>
      )}
    </div>
  );
};

export default ConnectForm;
