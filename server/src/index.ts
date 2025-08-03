import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket) => {
  console.log("some one is try to connect..");
  io.emit("hello","Hello from server ...")
});

io.listen(3000);
console.log("socket server listening on 3000...");