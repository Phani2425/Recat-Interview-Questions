import { useState } from "react"
import UseWindowResize from "./UseWindowResize";


const WindowResize = () => {

  const [width,setwidth] = useState(window.innerWidth);
  const [height,setheight] = useState(window.innerHeight); 

  UseWindowResize(setheight,setwidth);

  return (
    <div className="w-screen h-screen bg-yellow-400 flex justify-center items-center">
        <div className="flex flex-col gap-4 p-5 border-2 border-black rounded-lg bg-yellow-700 text-white">
            <h1 className="text-4xl font-bold">Window Resize component</h1>
             <h1>{`Width:- ${width}px`}</h1>
             <h1>{`Height:- ${height}px`}</h1>
        </div>
    </div>
  )
}

export default WindowResize