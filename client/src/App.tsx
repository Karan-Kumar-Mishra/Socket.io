import { useEffect, useState } from 'react'

import './App.css'
import { io } from "socket.io-client";

function App() {

  const [socketid, setsocketid] = useState<String>();
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connect with the  server => ")
    })
    socket.on('hello', (msg: string) => {
      console.log(msg, socket.id)
      setsocketid(socket.id);
    })
  }, [])
  return (
    <>
      <h1>socket {socketid}</h1>
    </>
  )
}

export default App
