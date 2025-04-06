import { io , httpSever} from "../server";

enum UserStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    TYPING = "typing",
    IDLE = "idle"
}

interface IUSER {
    socketId: string;
    roomId: string | number;
}

interface IUSERSTATUS extends IUSER {
    status: UserStatus;
    cursorPosition: number;
    typing: boolean;
    currentFile: string;
}

let SocketUsers: IUSER[] = [];

// let pairProgrammer: IUSER[] = []

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    const user: IUSER = { socketId: socket.id, roomId: 1 };
    SocketUsers.push(user);

    socket.on("code-change", (data) => {
        // console.log("Hello motherfucking world")
        // console.log(`Received 'code-change' from ${socket.id}`);
        console.log("Data received:", data);
        console.log("DATA RECIEVED: ", socket.id)
        socket.broadcast.emit("merge-code", data, socket.id);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        SocketUsers = SocketUsers.filter((user) => user.socketId !== socket.id);
    });

    socket.on("error", (e) => {
        console.error("Error in socket.io: ", e);
    });
});

httpSever.listen(3000, () => {
    console.log("Server bounded successfully on Port:", 3000);
  });
  
