"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";


export default function Chat(){

  const {
    messages,
    sendMessage,
    status
  } = useChat();


  const [input,setInput] = useState("");


  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();

    if(!input.trim()) return;


    await sendMessage({
      text: input
    });


    setInput("");

  }


  return (

    <div className="max-w-xl mx-auto mt-10">


      <h1 className="text-3xl font-bold mb-5">
        Groq Chat
      </h1>


      <div className="border h-[400px] overflow-y-auto p-4">


        {messages.map((message)=>(
          
          <div key={message.id} className="mb-4">

            <b>{message.role}</b>


            {message.parts.map((part,index)=>(

              part.type==="text" && (

                <p key={index}>
                  {part.text}
                </p>

              )

            ))}

          </div>

        ))}


        {status==="streaming" && (
          <p>AI typing...</p>
        )}


      </div>



      <form 
      onSubmit={handleSubmit}
      className="flex gap-2 mt-4"
      >

        <input

        value={input}

        onChange={(e)=>setInput(e.target.value)}

        className="border p-2 flex-1"

        placeholder="Type message"

        />


        <button
        className="bg-black text-white px-5"
        >

          Send

        </button>


      </form>


    </div>

  );

}