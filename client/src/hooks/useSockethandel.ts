import { useState, useRef, useMemo, useEffect } from "react";
import { io } from 'socket.io-client';
import scroll_to_bottom from "../lib/Scrolltobottom";
import PutSelfMsg from "../lib/PutSelfMsg";

export default function useSockethandel() {
    const [socketId, setSocketId] = useState<string>('');
    const [messge, setmessage] = useState<string[]>([]);
    const roomRef = useRef<HTMLInputElement>(null);
    const socket = useMemo(() => io('http://localhost'), []);

    useEffect(() => {
        socket.on('connect', () => {
            scroll_to_bottom();
            console.log('Connected to the server');
            setSocketId(socket.id || "not found !");
            socket.on('new_msg', (data: string) => {
                if (data)
                    setmessage((prev) => [...prev, data]);
                scroll_to_bottom();
            })
            socket.on('grp_ntfy', (data: string) => {
                if (data)
                    setmessage((prev) => [...prev, data]);

                scroll_to_bottom();
            })

        });
        return () => {
            socket.off('connect');
            socket.disconnect();
        };
    }, [socket]);

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const msg = e.currentTarget.value.trim();
            const roomid = roomRef.current?.value.trim();
            if (roomid == null || roomid.length == 0 || roomid == undefined) {
                console.log("transmit the group message ....", msg, "size => " + (msg.length != 0))

                scroll_to_bottom();
                socket.emit('grp_msg', msg, (res: { status: string }) => {
                    console.log(res.status)
                    if (msg.length != 0) {
                        if (res.status == "ok") {
                            PutSelfMsg(msg, "green")
                        }
                        else {
                            PutSelfMsg(msg, "white")
                        }
                    }
                });
            }
            else {

                socket.emit('user_msg', { message: msg, room: roomid }, (res: { status: string }) => {
                    if (msg.length != 0) {
                        if (res.status == "ok") {
                            PutSelfMsg(msg, "green")
                        }
                        else {
                            PutSelfMsg(msg, "white")
                        }
                    }
                });
            }
            e.currentTarget.value = '';
        }
    }
    
    return [messge,setmessage,socket,socketId,setSocketId,handleKeyPress,roomRef];
}