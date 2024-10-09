import { useState } from "react"
import Modal from "./Modal";


const HomeForModal = () => {

    const [modalState, setmodalState] = useState(false);

  const modalHandler = () => {
      setmodalState(!modalState);
  
  }

  return (
    <div className="h-screen w-screen bg-amber-500 flex justify-center items-center relative">

        <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:scale-95" onClick={modalHandler}>Open Modal</button>

        {
            modalState && (<Modal setmodalState = {setmodalState} />)
        }
        
    </div>
  )
}

export default HomeForModal