import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ConnectionPreview from "./ConnectionPreview";

const Connections = () => {
  const { currentUser, attemptFetchUser } = useOutletContext();

  useEffect(() => {
    attemptFetchUser();
  }, []);
  if (!currentUser) return null;

  const {
    connectedUsers,
    pendingConnections,
    incomingConnections,
  } = currentUser.connections;

  const renderConnectionSection = (users, title) => {
    return (
      <div className="text-center">
        <h2 className="text-xl my-4">{title}</h2>
        <div className="flex justify-center flex-wrap">
          {renderConnectionPreviews(users)}
        </div>
      </div>
    );
  };
  const renderConnectionPreviews = (users) => {
    return users.map((user) => {
      return <ConnectionPreview user={user} />;
    });
  };

  return (
    <div>
      <div className="inner-container py-3">
        <h1 className="text-xl font-bold">Connections</h1>
      </div>

      <div className="inner-container">
        {connectedUsers?.length > 0 &&
          renderConnectionSection(connectedUsers, "Connected With")}
        {incomingConnections?.length > 0 &&
          renderConnectionSection(incomingConnections, "Incoming Requests")}
        {pendingConnections?.length > 0 &&
          renderConnectionSection(pendingConnections, "Pending Requests")}
        {connectedUsers?.length == 0 &&
          incomingConnections?.length == 0 &&
          pendingConnections?.length == 0 && (
            <div className="text-2xl text-slate-600 text-center">
              No connections yet, swipe to find some!
            </div>
          )}
      </div>
    </div>
  );
};

export default Connections;
