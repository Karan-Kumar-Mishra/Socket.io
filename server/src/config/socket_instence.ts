import type { DefaultEventsMap } from "socket.io";
import type { Socket } from "socket.io";

let socket_instence: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = undefined as unknown as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export function Set_socket_instence(instence:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>)
{
  socket_instence=instence;
}
export function Get_socket_instence()
{
  if(socket_instence==null || socket_instence==undefined)
  {
    console.error("socket instence is empty...")
  }
  return socket_instence;
}