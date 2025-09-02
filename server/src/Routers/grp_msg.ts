import type { socket_type,AckCallback } from "../types.js";

export default function grp_msg(socket:socket_type,data: any,callback:AckCallback) {
    console.log("grp msg=> ", data);
    socket.broadcast.emit('grp_ntfy', data)
    if(callback)
    {
        callback({
            status: "ok"
        });
    }
}