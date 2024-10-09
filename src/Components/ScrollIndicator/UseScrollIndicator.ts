import { useEffect, useState } from "react"


const UseScrollIndicator = () => {

    const [calculatedHeight, setcalculatedHeight] = useState<number>(0);

    const scrollUpdater = () => {
        const scrollheight = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;

        if(totalHeight){
            setcalculatedHeight(Number((scrollheight / totalHeight).toFixed(2)) * 100)
        }
    }

   useEffect(()=> {
       window.addEventListener('scroll', scrollUpdater);

       return () => {
        window.removeEventListener('scroll', scrollUpdater);
       }
   }
,[])

  return calculatedHeight;
}

export default UseScrollIndicator