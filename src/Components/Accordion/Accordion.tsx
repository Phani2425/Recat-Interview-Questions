import { useState } from "react"
import accordionData from "./data"

const Accordion = () => {

   const [multiselection, setmultiselection] = useState<boolean>(false);

   const [selected, setselected] = useState<number[]>([]);


   const selectionHandler = (id:number) => {
     if(multiselection){
         if(selected.findIndex((num) => num === id) !== -1){
          setselected(selected.filter(value => value !== id));
         }
         else{
            setselected([...selected, id]);
         }
     }
     else{
        if(selected.includes(id)){
            setselected([]);
        }
        else{
            setselected([id]);
        }
     }
   }

  return (
    <div className=" w-screen h-screen m-auto flex flex-col gap-4 justify-center items-center">
        <button onClick={()=> {setmultiselection(!multiselection);
            if(selected.length > 0){
                setselected([]);
            }
        }
        } className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md ">{`${multiselection ? 'Disable' : 'Enable' } Multi Selection` }</button>

        <div className="flex flex-col gap-3">
            {
                accordionData && accordionData.length > 0 ? (accordionData.map((item,index) => (
                    <div key={item.id} className="flex flex-col gap-2 bg-red-600 px-3 py-4 rounded-md mx-auto text-white w-[500px]">
                        <div className="flex justify-between items-center font-semibold cursor-pointer" onClick={()=> {selectionHandler(item.id)}}>
                            {
                                item.title
                            }
                            <span className="font-bold text-xl">{`${selected?.includes(item.id) ? '-' : '+'}`}</span>
                        </div>
                        <div className={`${ selected?.includes(item.id) ? 'block' : 'hidden'}`}>
                            {
                                item.content
                            }
                        </div>
                    </div>
                ))) : (<div>No Data Found</div>)
            }
        </div>

    </div>
  )
}

export default Accordion