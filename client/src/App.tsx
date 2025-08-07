import './App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { compile } from 'tailwindcss';

function App() {
  const [socketId, setSocketId] = useState<string>('');
  const [messge, setmessage] = useState<string[]>([]);
  const [room_id, setroom_id] = useState<string[]>([]);
  const roomRef = useRef<HTMLInputElement>(null);
  const socket = useMemo(() => io('http://localhost'), []);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
      setSocketId(socket.id || "not found !");
      socket.on('new_msg', (data: string) => {
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
      console.log('Message:', msg);
      console.log("room=>", roomRef.current?.value)
      const roomid = roomRef.current?.value.trim();
      socket.emit('user_msg', { message: msg, room: roomid });
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="bg-neutral-800 h-screen  text-white flex justify-center items-center">
      <div>
        {messge.map((msg) => {
          return (
            <h4>{msg}</h4>
          )
        })}
      </div>
      <div className="bg-neutral-400 mt-[20rem] gap-2 p-4 flex flex-col">
        <input
         className='border-2 border-black text-black p-2'
          ref={roomRef}
          type="text"
          placeholder="Room Id"
        />
        <input
          type="text"
          onKeyDown={handleKeyPress}
          className="w-80 p-2 text-black"
          placeholder="Type a message..."
        />
        <h4 className="bg-slate-600 mt-1 p-2">ID: {socketId}</h4>
      </div>
    </div>
  );
}

export default App;