import React from 'react'

interface Prop {
  totalPage:number;
  currentPage:number;
  setCurrentPage(page:number):void //LEARNED THIS
}

const PageNavigation: React.FC<Prop>  = (props) => {
    const arr:number[]=[];
    for (let i=1;i<=props.totalPage;i++){
         arr.push(i);
    }

  return (
    <div className='flex gap-2 items-center justify-center'>
         <button disabled={props.currentPage === 1} className={`px-4 py-2 rounded-lg bg-yellow-500 ${props.currentPage === 1 && 'opacity-50'} `} onClick={()=>{
            props.setCurrentPage(props.currentPage-1)
         }}>Prev</button>
         {
            arr.map((pageNo) => 
                <button key={pageNo} className={`h-7 w-7 rounded-full flex items-center justify-center ${props.currentPage === pageNo ? 'bg-slate-700 text-white' : 'bg-slate-500'}`} onClick={() => {
                    props.setCurrentPage(pageNo)
                }} >{pageNo}</button>
            )
         }
         <button disabled={props.currentPage === arr.length}  className={`px-4 py-2 rounded-lg bg-yellow-500 ${props.currentPage === arr.length && 'opacity-50'} `} onClick={()=>{
            props.setCurrentPage(props.currentPage+1)
         }} >Next</button>
    </div>
  )
}

export default PageNavigation