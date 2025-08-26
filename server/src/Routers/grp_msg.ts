import type { socket_type } from "../types.js";
export default function grp_msg(socket:socket_type,data: any) {
    console.log("grp msg=> ", data);
    socket.broadcast.emit('grp_ntfy', data)
}