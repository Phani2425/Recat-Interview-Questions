import React from 'react'

interface dataObject{
    name:string;
}

interface props {
    pageData:dataObject[];
}

const SinglePage: React.FC<props> = ({pageData}) => {
  return (
    <div className= 'w-[40%] flex flex-wrap gap-2'>
       {
        pageData.map((data,index) => 
            <div key={index} className='bg-violet-700 text-white px-3 py-2'>{data.name}</div>
        )
       }
    </div>
  )
}

export default SinglePage