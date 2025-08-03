import { Server } from "socket.io";
const io = new Server({ /* options */});
io.on("connection", (socket) => {
    console.log("some one is try to connect..", socket);
});
io.listen(3000);
//# sourceMappingURL=index.js.map