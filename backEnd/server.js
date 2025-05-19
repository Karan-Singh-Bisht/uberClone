require("dotenv").config();
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initializeSocket(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
