import { useEffect, useState } from "react";
import './Button.css';


const ButtonRipple = () => {

    const [coordinates, setcoordinates] = useState({x:-1,y:-1});
    const [isipplingActive, setisRipplingActive] = useState(false);

  const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
     const rectangle = e.currentTarget.getBoundingClientRect();
     const x = e.clientX - rectangle.left;
     const y = e.clientY - rectangle.top;

     setcoordinates({x,y});
     

  }

  useEffect(() => {

    setisRipplingActive(true);

    const timeoutID = setTimeout(() => {
       setisRipplingActive(false);
    },1000)

    return () => {
       clearTimeout(timeoutID);
    }
      
  },[coordinates])

  return (
    <div className="flex flex-col justify-center items-center gap-5 my-36">
        <h1 className="font-bold text-5xl mb-7">ButtonRipple Effect Container</h1>

        <div className="relative overflow-hidden" onClick={clickHandler}>
        <button className=" px-4 py-3 bg-yellow-500 rounded-md text-white font-semibold">Click button to see ripple effect</button>
        {isipplingActive && (<div className=" ripple absolute bg-red-500 h-20 w-20 rounded-full "  style={{left:`${coordinates.x-35}px`, top:`${coordinates.y-35}px`}}></div>)}
        </div>
    </div>
  )
}

export default ButtonRipple