import { useEffect } from "react"


const UseCheckPosition = (setbuttomReached:any) => {

  const scrollHandler = () => {

    if(( document.body.scrollHeight - window.innerHeight) - window.scrollY <= 45 ){
        setbuttomReached(true);
    }else{
        setbuttomReached(false);
    }
  }

   useEffect(() => {
      window.addEventListener('scroll', scrollHandler);

      return () => {
        window.removeEventListener('scroll', scrollHandler);
      }
   },[])
}

export default UseCheckPosition