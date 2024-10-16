import { useState } from "react";
import Timer from "./Timer"



const CountDown = () => {

  const [timerRuning,settimerRuning] = useState(false);
  const [minute,setminute] = useState(2);
  const [second,setsecond] = useState(0);

  return (
    <div className="my-36 w-8/12 mx-auto flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl font-bold ">CountDown Timer</h1>
      <Timer minute={minute} second={second} setminute={setminute}  setsecond={setsecond}
      timerRuning={timerRuning} settimerRuning={settimerRuning} />

<div className="flex gap-2 justify-center items-center">
      <button className="px-4 py-2 rounded-lg bg-yellow-500" onClick={() => {settimerRuning(!timerRuning)}}>
        {timerRuning? "Pause" : "Resume"}
      </button>

      <button className="px-4 py-2 rounded-lg bg-yellow-500" onClick={() => {setminute(2);setsecond(0);settimerRuning(false)}}>
        Reset
      </button>

      <button className="px-4 py-2 rounded-lg bg-yellow-500" onClick={() => {settimerRuning(true)}}>
        Start
      </button>
    </div>
    </div>
  )
}

export default CountDown

//this is the main component which renders another 2 components in it........

// so  here and in pagination project i learnt aconcept of reusability where in this project