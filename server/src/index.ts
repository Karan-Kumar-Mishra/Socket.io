import io from "./config/SocketServer.js";
import router from "./Routers/route.js";

router()

io.listen(80);
console.log("socket server listening on 80");