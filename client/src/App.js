import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from 'react';

//const socket = io("http://localhost:4000");
const socket = io();

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{
    body: "Mensaje test",
    from: "user1"
  }]);

  const mandarMensaje = (e) => {
    e.preventDefault();
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: "Tú"
    }
    setMessages([newMessage, ...messages])
    setMessage('');
  }

  useEffect(()=>{
    const recibeMensaje = (msg) =>{
      setMessages([msg, ...messages])
    };
    socket.on('message', recibeMensaje);
    return () => {
      socket.off('message', recibeMensaje);
    }
  }, [messages])

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
        <form onSubmit={mandarMensaje} className="bg-zinc-900 p-10">
          <h1 className='text-2x1 font-bold my-2'>Chat React</h1>
          <input 
            type="text" 
            onChange={e => setMessage(e.target.value)} 
            value={message}
            className="border-2 border-zinc-500 p-2 text-black w-full"
            />
          {/* <button className='bg-blue-500'>enviar</button> */}
          <ul className='h-80 overflow-y-auto'>
            {messages.map((message, i) => (
              <li key={i} className={`p-2 my-2 text-sm rounded-md ${message.from === "Tú" ? "bg-sky-700 table ml-auto": "bg-black"}`}>
                <p>{message.from}: {message.body}</p>
              </li>
            ))}
          </ul>
        </form>
    </div>
  );
}

export default App;
