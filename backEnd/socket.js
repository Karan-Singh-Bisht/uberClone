const Captain = require("./models/captain.model");
const Ride = require("./models/ride.model");
const socketIo = require("socket.io");

let io;
const userSocketMap = new Map(); // userId => Set<socketId>

const getSocketIds = (userId) => Array.from(userSocketMap.get(userId) || []);

const addUserSocket = (userId, socketId) => {
  if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
  userSocketMap.get(userId).add(socketId);
};

// Remove socket from user map
const removeSocket = (socketId) => {
  for (const [userId, sockets] of userSocketMap.entries()) {
    if (sockets.has(socketId)) {
      sockets.delete(socketId);
      if (sockets.size === 0) userSocketMap.delete(userId);
      break;
    }
  }
};

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", ({ userId, userType }) => {
      if (!userId || !userType) return;
      addUserSocket(userId, socket.id);
      console.log(
        `User ${userId} (${userType}) joined with socket ${socket.id}`
      );
    });

    // Step 2: Captain updates their own location in DB
    socket.on("updateCaptainLocation", async ({ userId, location }) => {
      if (
        !location ||
        location.type !== "Point" ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        console.log(userId);
        const updatedCaptain = await Captain.findByIdAndUpdate(
          userId,
          { location },
          { new: true }
        );

        if (!updatedCaptain) {
          return socket.emit("error", { message: "Captain not found" });
        }

        // ✅ Also fetch the ongoing ride and notify user
        const ongoingRide = await Ride.findOne({
          captain: userId,
          status: "ongoing",
        });

        if (ongoingRide.user) {
          const userSockets = getSocketIds(ongoingRide.user.toString());
          userSockets.forEach((sockId) => {
            io.to(sockId).emit("captainLocationUpdate", location.coordinates);
          });
        }
      } catch (err) {
        console.error("Failed to update location:", err);
        socket.emit("error", { message: "Location update failed" });
      }
    });

    // Clean up on disconnect
    socket.on("disconnect", () => {
      removeSocket(socket.id);
      console.log("Socket disconnected:", socket.id);
    });
  });
};

// Send custom message to a socketId
const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
  getSocketIds,
};
