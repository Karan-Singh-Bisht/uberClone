const User = require("./models/user.model");
const Captain = require("./models/captain.model");

let _io = null; // store io instance globally in this file

const initializeSocket = (io) => {
  _io = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register a driver
    socket.on("join", async (data) => {
      try {
        const { userId, userType } = data;
        if (userType === "user") {
          await User.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error("Error registering user:", err);
        socket.emit("error", { message: "Registration failed" });
      }
    });

    socket.on("updateCaptainLocation", async ({ userId, location }) => {
      try {
        if (
          !location ||
          location.type !== "Point" ||
          !Array.isArray(location.coordinates) ||
          location.coordinates.length !== 2
        ) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        const result = await Captain.findByIdAndUpdate(
          userId,
          { location },
          { new: true }
        );

        if (!result) {
          return socket.emit("error", { message: "Failed to update location" });
        }
      } catch (err) {
        console.error("Error updating location:", err);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (_io) {
    _io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket not initialized");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
