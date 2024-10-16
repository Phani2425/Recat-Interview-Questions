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

  },[minute,second,timerRuning])///also as useeffect is runnig on change of every state we have defined so we can even remnove the dependency array that will act simillarly as this

  //i can sole this in another way where there will be only one state variable which is time and minutes and second will be derived from that only

  //that will be update dby using the concept of passing callback function in statechange function instead using closure concept,,, in that method  we can ommit minute and second variable from dependency  list

 

  return (
    <div className='text-3xl font-bold text-blue-600'>
      <span>{minute.toString().padStart(2,"0")}</span>:
      <span>{second.toString().padStart(2,"0")}</span>
    </div>
  )
}

export default Timer



//INTIALLY I MADE MISTAKE HERE IN THE USEEFFECT AND SETINTERVAL AS I WAS UNAWARE OF CONCEPT OF BOTH:-  LETS UNDERSTAND THHEM:- 



// in this when comp mount useeffect run and a setinterval is added which will call the function every second by which the minute and second should get updated and due to that the component should get rerendered but why the timer stopes by runnigg only 1 second

//PREVIOUS WRONG CODE:-

// import React, { useEffect, useState } from 'react'

// interface timer {
//   minute: number,
//   second: number,
//   setminute(minute:number):void ,
//   setsecond(second:number):void ,
//   settimerRuning(timer:boolean): void
// }

// const Timer: React.FC<timer> = ({minute,second,setminute,setsecond,settimerRuning}) => {
 
// console.log(minute,":",second);

//   useEffect(()=>{
//      const intervalId = setInterval(()=>{
//          if(minute === 0 && second === 0){
//            settimerRuning(false);
//          }
//          else if(second === 0){
//            setsecond(59);
//            setminute(minute - 1);
//          }
//          else{
//            setsecond(second - 1);
//          }
//      },1000)

//       return  () => {
//         clearInterval(intervalId);
//       }

//   },[])

//   return (
//     <div className='text-3xl font-bold text-blue-600'>
//       <span>{minute.toString().padStart(2,"0")}</span>:
//       <span>{second.toString().padStart(2,"0")}</span>
//     </div>
//   )
// }

// export default Timer
// ChatGPT said:
// ChatGPT
// The reason the timer in your Timer component stops after just 1 second is because the useEffect hook is running only once, on the initial mount, and the minute and second values inside the useEffect are not being updated on subsequent renders. This is due to the fact that useEffect captures the initial values of minute and second when it first runs, but does not track changes in them over time.

// Why This Happens:
// Initial Values Captured: When the component mounts, the useEffect hook runs, and it sets up the interval using the initial values of minute and second. These values are "captured" in the scope of the useEffect callback and do not change inside that callback when minute or second change in the future.

// No Dependency on minute or second: Since the useEffect hook has an empty dependency array ([]), it does not track changes to minute and second. Therefore, it always uses the values from when the component first mounted, which causes the interval logic to behave incorrectly after the first second.

// Solution:
// You need to add minute and second as dependencies in the useEffect hook to ensure that the interval logic works with the latest values of minute and second after each re-render.

// Updated Code:
// tsx
// Copy code
// import React, { useEffect, useState } from 'react';

// interface timer {
//   minute: number;
//   second: number;
//   setminute(minute: number): void;
//   setsecond(second: number): void;
//   settimerRuning(timer: boolean): void;
// }

// const Timer: React.FC<timer> = ({ minute, second, setminute, setsecond, settimerRuning }) => {
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (minute === 0 && second === 0) {
//         settimerRuning(false);
//         clearInterval(intervalId); // stop the timer when it hits zero
//       } else if (second === 0) {
//         setsecond(59);
//         setminute(minute - 1);
//       } else {
//         setsecond(second - 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [minute, second, setminute, setsecond, settimerRuning]); // Add dependencies

//   return (
//     <div className='text-3xl font-bold text-blue-600'>
//       <span>{minute.toString().padStart(2, '0')}</span>:
//       <span>{second.toString().padStart(2, '0')}</span>
//     </div>
//   );
// };

// export default Timer;
// Key Changes:
// The useEffect hook now has [minute, second, setminute, setsecond, settimerRuning] in the dependency array.
// This ensures that the interval function always uses the latest values of minute and second after each state update.
// How This Works:
// Now, each time minute or second changes, the useEffect hook will re-run and set up a new interval with the updated values.
// The interval will continue to update minute and second correctly until the timer reaches zero.
// This way, the timer will count down correctly, updating the component every second until it reaches zero.






// You said:
// but tell me if the fum=nction passed in useinterval runs every second then why do not it update time  
// ChatGPT said:
// ChatGPT
// The reason the timer in your Timer component does not update correctly lies in how closures work in JavaScript, particularly in the context of the setInterval function and the values captured by its callback.

// Understanding the Problem
// Closure in JavaScript:

// When you create an interval using setInterval, it captures the state of the variables at the time the function is defined (in this case, minute and second).
// This means that inside the setInterval function, it uses the values of minute and second as they were when the useEffect hook first ran, not the updated values.
// Effect of the Dependency Array:

// Since the useEffect has an empty dependency array ([]), it runs only once when the component mounts. The setInterval function is then created with the initial values of minute and second.
// Every time the interval runs (every second), it is still using these initial values, not the updated ones.
// Example:
// For example, if you start with minute = 1 and second = 30, when the useEffect runs the first time, it sets the interval like this:

// javascript
// Copy code
// const intervalId = setInterval(() => {
//   // This captures minute = 1 and second = 30
//   if (minute === 0 && second === 0) {
//     settimerRuning(false);
//   } else if (second === 0) {
//     setsecond(59);
//     setminute(minute - 1); // still using initial `minute = 1`
//   } else {
//     setsecond(second - 1); // still using initial `second = 30`
//   }
// }, 1000);
// How to Fix It
// To ensure that the timer updates correctly, you need to include minute and second in the dependency array of the useEffect. This will cause the effect to re-run whenever these values change, allowing the interval function to capture the latest values of minute and second.

// Here’s the corrected implementation again:

// tsx
// Copy code
// import React, { useEffect, useState } from 'react';

// interface TimerProps {
//   minute: number;
//   second: number;
//   setminute(minute: number): void;
//   setsecond(second: number): void;
//   settimerRuning(timer: boolean): void;
// }

// const Timer: React.FC<TimerProps> = ({ minute, second, setminute, setsecond, settimerRuning }) => {
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Use the latest values of minute and second
//       if (minute === 0 && second === 0) {
//         settimerRuning(false);
//         clearInterval(intervalId); // Stop the timer when it hits zero
//       } else if (second === 0) {
//         setsecond(59);
//         setminute(minute - 1);
//       } else {
//         setsecond(second - 1);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(intervalId); // Cleanup interval on unmount
//     };
//   }, [minute, second, settimerRuning, setminute, setsecond]); // Include dependencies

//   return (
//     <div className='text-3xl font-bold text-blue-600'>
//       <span>{minute.toString().padStart(2, '0')}</span>:
//       <span>{second.toString().padStart(2, '0')}</span>
//     </div>
//   );
// };

// export default Timer;
// Summary:
// By adding minute and second to the dependency array, you ensure that the setInterval function has access to the latest state values each time it runs.
// This way, every time the interval function executes (every second), it will reflect the current minute and second values, allowing the timer to update correctly.