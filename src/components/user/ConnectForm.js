const ConnectForm = ({
  currentUser,
  shownUser,
  handleMessageLink,
  handleConnectionRequest,
  handleConnectionAccept,
  handleConnectionReject,
}) => {
  const isPendingOutgoingRequest = () => {
    return currentUser.connections.pendingConnections
      .map((u) => u.id)
      .includes(shownUser.info.id);
  };

  const isPendingIncomingRequest = () => {
    return currentUser.connections.incomingConnections
      .map((user) => user.id)
      .includes(shownUser.info.id);
  };

  const isAlreadyConnected = () => {
    return currentUser.connections.connectedUsers
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
        <button
          disabled
          className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded disabled"
        >
          Pending
        </button>
      )}
      {isPendingIncomingRequest() && (
        <>
          {/* <h5>{this.props.shownUser.username} has requested to connect</h5> */}
          <button
            className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded"
            onClick={handleConnectionAccept}
          >
            Accept
          </button>
          <button
            className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded"
            onClick={handleConnectionReject}
          >
            Reject
          </button>
        </>
      )}
      {isAlreadyConnected() && (
        <button
          className="message-user-button "
          onClick={handleMessageLink}
          className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded"
        >
          Message
        </button>
      )}
      {noConnection() && (
        <button
          onClick={handleConnectionRequest}
          className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded"
        >
          Jam!
        </button>
      )}
    </div>
  );
};

export default ConnectForm;
