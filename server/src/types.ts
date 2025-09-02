
import type { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io";

export type socket_type = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type AckCallback = (response: { status: string }) => void;