import io from "../config/SocketServer.js";
import authentication from "../middleware/authentication.js";
export default function router() {
  io.use(authentication)

  io.on("connection", (socket) => {
    console.log("some one is try to connect..", socket.id);
    socket.on('user_msg', (data) => {
      console.log("user msg=> ", data);
      socket.to(data.room).emit('new_msg',data.message);
    })
  });
}
