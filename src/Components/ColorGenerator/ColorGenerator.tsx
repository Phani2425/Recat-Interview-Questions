import { useEffect, useState } from "react"


const ColorGenerator = () => {

    // in this state variable tru means hex mode and false means rgb mode
    const [activeMode, setActiveMode] = useState<boolean>(true);

    const [currentColor, setCurrentColor] = useState<any>('#000000');

    const randomNum = () => {
        return Math.floor(Math.random() * 256);
    }

    const hexGenerator = () => {
        const arr:any[]  = [0,1,2,3,4,5,6,7,8,9,'A','B' ,'C' ,'D' ,'E' ,'F'];

        return arr[Math.floor(Math.random() * arr.length)];
    }

    const generateColors = () => {
        // logic to generate colors
        // based on mode (hex or rgb)
        if(activeMode){
           const one = hexGenerator();
           const two = hexGenerator();
           const three = hexGenerator();
           const four = hexGenerator();
           const five = hexGenerator();
           const six = hexGenerator();
           setCurrentColor(`#${one}${two}${three}${four}${five}${six}`);
        }
        else{
          const r = randomNum();
          const g = randomNum();
          const b = randomNum();
          setCurrentColor(`rgb(${r}, ${g}, ${b})`);
        }

    }

    useEffect(() => {
         generateColors();
    },[activeMode]);

  return (
    <div className={`w-full h-screen flex flex-col justify-around items-center`} style={{background:currentColor}}>
        <div className="flex gap-3">
           <button onClick={()=>{
            if(!activeMode){
                setActiveMode(true);
            }
            generateColors();
           }} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold">Create HEX Color</button>
           <button onClick={()=>{
            if(activeMode){
                setActiveMode(false);
            }
            generateColors();
           }} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold">Create RGB Color</button>
           <button onClick={() =>{generateColors();}} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold">Generate Random Color</button>
        </div>
        
            <span className="text-white font-bold text-5xl">{activeMode ? 'HEX Color' : 'RGB Color'}</span>
            <span className="text-white font-bold text-6xl">{currentColor}</span>
       
    </div>
  )
}

export default ColorGenerator