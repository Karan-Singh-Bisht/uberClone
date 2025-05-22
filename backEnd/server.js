require("dotenv").config();
const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
