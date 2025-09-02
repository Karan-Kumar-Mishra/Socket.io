import io from "../config/SocketServer.js";
import authentication from "../middleware/authentication.js";
import user_msg from "./user_msg.js";
import grp_msg from "./grp_msg.js";
export default function router() {
  io.on("connection", (socket) => {
    io.use(authentication)
    console.log("some one is try to connect..", socket.id);
    socket.on('user_msg', (data,callback) => user_msg(socket, data,callback));
    socket.on('grp_msg', (data,callback) => grp_msg(socket, data,callback));
  });
}
