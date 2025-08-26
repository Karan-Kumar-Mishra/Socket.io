import io from "../config/SocketServer.js";
import authentication from "../middleware/authentication.js";
import user_msg from "./user_msg.js";
import grp_msg from "./grp_msg.js";
export default function router() {
  io.on("connection", (socket) => {
    io.use(authentication)
    console.log("some one is try to connect..", socket.id);
    socket.on('user_msg', (data) => user_msg(socket, data));
    socket.on('grp_msg', (data) => grp_msg(socket, data));
  });
}
