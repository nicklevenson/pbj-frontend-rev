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
          className="py-2 px-4 bg-indigo-600 text-white border-gray-500 border-solid border rounded disabled"
        >
          Pending
        </button>
      )}
      {isPendingIncomingRequest() && (
        <div className="flex gap-8">
          {/* <h5>{this.props.shownUser.username} has requested to connect</h5> */}
          <button
            className="py-2 px-4 bg-indigo-600 text-white border-gray-500 border-solid border rounded"
            onClick={handleConnectionAccept}
          >
            Accept
          </button>
          {/* <button
            className="py-2 px-4 bg-indigo-600 text-white border-gray-500 border-solid border rounded"
            onClick={handleConnectionReject}
          >
            Reject
          </button> */}
        </div>
      )}
      {isAlreadyConnected() && (
        <button
          className="message-user-button "
          onClick={handleMessageLink}
          className="py-2 px-4 bg-indigo-600 text-white border-gray-500 border-solid border rounded"
        >
          Message
        </button>
      )}
      {noConnection() && (
        <button
          onClick={handleConnectionRequest}
          className="py-2 px-4 bg-indigo-600 text-white border-gray-500 border-solid border rounded"
        >
          Jam!
        </button>
      )}
    </div>
  );
};

export default ConnectForm;
