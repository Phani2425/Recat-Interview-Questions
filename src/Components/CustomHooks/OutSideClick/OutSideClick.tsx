import { useRef, useState } from "react";
import UseOutsideClick from "./UseOutsideClick";


const OutSideClick = () => {

  const [showContent, setshowContent] = useState<boolean>(false);
  const refObj = useRef(null);

  UseOutsideClick(refObj, setshowContent);

  return (
    <div  className="h-screen w-screen flex justify-center items-center">
        <div ref={refObj} className="h-[50%] w-[50%] p-5 border-2 border-black bg-stone-900 rounded-lg flex justify-center items-center">
        {
           showContent ? <h1 className="text-white">This is somme random content... Click on outside of div to hide this...</h1> : <button className="px-4 py-2 rounded-lg bg-teal-700 text-white" onClick={() => {setshowContent(true)}}>Show Content</button>
        }
        </div>
    </div>
  )
}

export default OutSideClick