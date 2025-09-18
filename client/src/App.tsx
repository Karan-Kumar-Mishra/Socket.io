import './App.css';
import useSockethandel from './hooks/useSockethandel';

function App() {
  const [messge, setmessage, socket, socketId, setSocketId, handleKeyPress, roomRef] = useSockethandel();

  return (
    <div className="bg-neutral-800 h-screen  text-white flex justify-center flex-col items-center ">

      <div className='message_window font-extrabold font-serif m-2  w-200 h-100 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden'>
        {messge.map((msg) => {
          return (
            <div className='w-80 flex flex-wrap justify-between  items-center border-1 border-white m-2 p-2 overflow-hidden rounded-2xl' key={msg}>
              <p>
                {msg}
              </p>
              <p className='h-4 w-4 m-[0.1rem] bg-red-500  rounded-full'></p>
            </div>
          )
        })}
      </div>
      <div className="bg-neutral-400 border-green-600 gap-2 p-4 flex flex-col  w-200 rounded-s-sm ">
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
        <h4 className={`mt-1 p-2 text-black ${socketId.length == 0 ? 'bg-red-400' : ' bg-green-600'}`}>ID: {socketId}</h4>
      </div>

    </div>
  );
}

export default App;