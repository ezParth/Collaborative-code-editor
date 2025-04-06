import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

interface User {
  username: string
  roomId: string
}

const app = express();
const httpSever  = createServer(app);
const io = new Server(httpSever, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e8,
	pingTimeout: 60000,
});

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
// });

const port = 3000;


app.get('/', (req, res) => {
  res.send('Server is running bro!');
});

// httpSever.listen(port, () => {
//   console.log("Server bounded successfully on Port:", port);
// });

export { io, httpSever };

require("./sockets/socket")
