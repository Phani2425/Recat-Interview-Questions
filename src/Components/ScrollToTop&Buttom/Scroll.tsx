import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import UseCheckPosition from "./UseCheckPosition";


const Scroll = () => {
 
    const [buttomReached, setbuttomReached] = useState(false);

    //here we will create a custom hook which will check at which position we are now in the webpage if we are at complete bootom then it will set the buttomReached state variable to true and if not then false

    UseCheckPosition(setbuttomReached);

    const clickHandler = () => {
      if(buttomReached){
        window.scrollTo({top:0, behavior:"smooth"})
      }else{
        window.scrollTo({top:document.body.scrollHeight, behavior:"smooth"})
      }
    }

  return (
    <div  className="w-14 h-14 rounded-full fixed right-5 bottom-5 bg-red-600 flex justify-center items-center text-4xl text-white font-semibold animate-bounce cursor-pointer" onClick={clickHandler} >{buttomReached ? (<IoIosArrowUp />) : (<IoIosArrowDown />)}</div>
  )
}

export default Scroll