import React, { useEffect, useState } from 'react'

interface timer {
  minute: number,
  second: number,
  setminute(minute:number):void ,
  setsecond(second:number):void ,
  timerRuning: boolean,
  settimerRuning(timer:boolean): void
}

const Timer: React.FC<timer> = ({minute,second,setminute,setsecond,timerRuning,settimerRuning}) => {

  useEffect(()=>{
    
    if(timerRuning){
      const intervalId = setInterval(()=>{
        if(minute === 0 && second === 0){
          settimerRuning(false);
        }
        else if(second === 0){
          setsecond(59);
          setminute(minute - 1);
        }
        else{
          setsecond(second - 1);
        }
    },1000)

     return  () => {
       clearInterval(intervalId);
     }

    }

    return;

  },[minute,second,timerRuning])

  return (
    <div className='text-3xl font-bold text-blue-600'>
      <span>{minute.toString().padStart(2,"0")}</span>:
      <span>{second.toString().padStart(2,"0")}</span>
    </div>
  )
}

export default Timer