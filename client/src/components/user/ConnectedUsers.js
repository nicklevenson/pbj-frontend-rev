const ConnectedUsers = ({ connections }) => {
  return (
    <div className="card-connections">
      <button
      // onClick={this.toggleConnectionsModal}
      >
        {/* <Icon name="user" /> */}
        {connections.connectedUsers.length || "0"} Connections
      </button>
    </div>
  );
};

export default ConnectedUsers;
