import type { socket_type } from "../types.js";
export default function user_msg(socket:socket_type,data: any) {
    console.log("user msg=> ", data);
    socket.to(data.room).emit('new_msg', data.message);
}