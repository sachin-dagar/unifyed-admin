import React, { useState, useEffect } from "react";
import { useAuth } from "../services/api/context/authContext/AuthContext";
import { io } from "socket.io-client";

function useInvolvSocket() {
  const [scoketData, setSocketData] = useState(null);

  const { token, userProfile } = useAuth();

  const socketUrl = "https://mobile-socket.unite.unifyed.com";

  const socket = io(socketUrl, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    extraHeaders: {
      Authorization: `Bearer ${token}`,
      uid: userProfile?.userId,
    },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socketInstance connected with socket id " + socket.id);
      handleIndividualNotificaiton(socket.id);
      setInterval(handleRegistration, 10000);
    });

    socket.on("connect_error", (err) => {
      console.log("socketInstance connected error " + err);
    });
  }, [socket]);

  const handleRegistration = () => {
    console.log("socketInstance emiting hearthbeat " + socket.id);
    socket.emit("WS_HB", {
      data: {
        uid: userProfile?.userId,
      },
    });
  };

  const handleIndividualNotificaiton = (socketId) => {
    console.log(
      `socketInstance Subscribing to all events against socket id ${socketId}`
    );
    socket.on(socketId, ({ data }) => {
      console.log(
        `socketInstance message received for ${
          userProfile?.userId
        }: ${JSON.stringify(data)}`
      );
    });
  };

  socket.on("TOTAL_LOGGEDIN_USERS", ({ data }) => {
    console.log(
      `socketInstance TOTAL_LOGGEDIN_USERS ${JSON.stringify(data)}`, userProfile
    );
    setSocketData(data);
  });

  return [scoketData];
}

export default useInvolvSocket;
