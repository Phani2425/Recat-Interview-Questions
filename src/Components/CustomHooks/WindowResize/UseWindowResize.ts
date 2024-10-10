import { useEffect } from "react"




const UseWindowResize = (setheight:any,setwidth:any) => {

   const resizeHandler = () => {
     setheight(window.innerHeight);
     setwidth(window.innerWidth);
   }

    useEffect(() => {
       window.addEventListener('resize', resizeHandler);

       return () => {
        window.removeEventListener('resize', resizeHandler);
       }
    },[])
}

export default UseWindowResize