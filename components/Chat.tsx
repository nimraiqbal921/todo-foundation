"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";


export default function Chat() {


  const {
    messages,
    sendMessage,
    stop,
    status,
  } = useChat();



  const [input, setInput] = useState("");

  const [isAtBottom, setIsAtBottom] = useState(true);



  const chatBoxRef = useRef<HTMLDivElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);




  // Auto scroll only if user is already at bottom

  useEffect(() => {


    if(isAtBottom){

      bottomRef.current?.scrollIntoView({
        behavior:"smooth",
      });

    }


  },[messages,isAtBottom]);





  function handleScroll(){


    const box = chatBoxRef.current;


    if(!box) return;



    const atBottom =
      box.scrollHeight -
      box.scrollTop <=
      box.clientHeight + 50;



    setIsAtBottom(atBottom);


  }





  function submit(e:React.FormEvent){


    e.preventDefault();



    if(!input.trim()) return;



    sendMessage({

      text:input,

    });



    setInput("");

  }







  return (

    <div className="w-full max-w-2xl mx-auto p-4">


      <h1 className="text-3xl font-bold mb-5">
        Groq AI Chat
      </h1>





      <div

        ref={chatBoxRef}

        onScroll={handleScroll}

        className="
        border
        rounded-lg
        p-4
        h-[500px]
        overflow-y-auto
        space-y-4
        relative
        "

      >





        {
          messages.map((message)=>(


            <div

            key={message.id}

            className={`
            p-3
            rounded-lg

            ${
              message.role==="user"
              ?
              "bg-blue-100 ml-10"
              :
              "bg-gray-100 mr-10"
            }

            `}

            >



              <p className="font-bold mb-1">

                {
                  message.role==="user"
                  ?
                  "You"
                  :
                  "AI"
                }

              </p>





              {
                message.parts.map((part,index)=>{


                  if(part.type==="text"){


                    return (

                      <p key={index}>
                        {part.text}
                      </p>

                    )

                  }


                  return null;


                })

              }



            </div>


          ))

        }







        {
          status==="submitted" && (


            <div

            className="
            bg-gray-100
            rounded-lg
            p-3
            mr-10
            "

            >

              AI is thinking...

            </div>


          )

        }






        <div ref={bottomRef}/>



      </div>







      {
        !isAtBottom && (


          <button


          onClick={()=>{


            bottomRef.current?.scrollIntoView({

              behavior:"smooth"

            });


            setIsAtBottom(true);


          }}


          className="
          fixed
          bottom-24
          right-10
          bg-black
          text-white
          px-4
          py-2
          rounded-full
          "

          >

            Jump to latest ↓


          </button>



        )

      }







      <form

      onSubmit={submit}

      className="
      flex
      gap-2
      mt-4
      "


      >




        <input


        value={input}


        onChange={(e)=>
          setInput(e.target.value)
        }


        placeholder="Type message..."


        className="
        flex-1
        border
        rounded-lg
        p-3
        "


        />







        {

          status==="streaming" ||
          status==="submitted"

          ?


          (

            <button


            type="button"


            onClick={()=>stop()}


            className="
            bg-red-600
            text-white
            px-5
            rounded-lg
            "

            >

              Stop


            </button>


          )


          :


          (

            <button


            type="submit"


            className="
            bg-black
            text-white
            px-5
            rounded-lg
            "

            >

              Send


            </button>


          )


        }





      </form>





    </div>


  );


}