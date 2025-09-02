import type { socket_type, AckCallback } from "../types.js";
export default function user_msg(socket: socket_type, data: any, callback: AckCallback) {
    console.log("user msg=> ", data);
    socket.to(data.room).emit('new_msg', data.message);
    if (callback) {
        callback({
            status: "ok"
        });
    }
}