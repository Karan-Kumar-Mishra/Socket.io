import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';


function App() {
  const [socketId, setSocketId] = useState<string>('');
  const [messge, setmessage] = useState<string[]>([]);
  const roomRef = useRef<HTMLInputElement>(null);
  const socket = useMemo(() => io('http://localhost'), []);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
      setSocketId(socket.id || "not found !");
      socket.on('new_msg', (data: string) => {
        setmessage((prev) => [...prev, data]);
      })
      socket.on('grp_ntfy', (data: string) => {
        setmessage((prev) => [...prev, data]);
      })
    });


    return () => {
      socket.off('connect');
      socket.disconnect();
    };
  }, [socket]);


  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const msg = e.currentTarget.value;
      const roomid = roomRef.current?.value.trim();
      if (roomid == null || roomid.length == 0 || roomid == undefined) {
        console.log("transmit the group message ....", msg)
        socket.emit('grp_msg', msg);
      }
      else {
        socket.emit('user_msg', { message: msg, room: roomid });
      }
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="bg-neutral-800 h-screen  text-white flex justify-center flex-col items-center ">
      <div className='font-extrabold font-serif m-2  w-200 h-100'>
        {messge.map((msg) => {
          return (
            <h4 key={msg}>{msg}</h4>
          )
        })}
      </div>
      <div className="bg-neutral-400  gap-2 p-4 flex flex-col  w-200 rounded-s-sm">
        <input
          className='border-2 border-black text-black p-2'
          ref={roomRef}
          type="text"
          placeholder="Room Id"
        />
        <input
          type="text"
          onKeyDown={handleKeyPress}
          className=" p-2 text-black"
          placeholder="Type a message..."
        />
        <h4 className="bg-slate-600 mt-1 p-2">ID: {socketId}</h4>
      </div>
    </div>
  );
}

export default App;