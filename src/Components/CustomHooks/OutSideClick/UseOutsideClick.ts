import { useEffect } from "react"

//WAY - 1


// const UseOutsideClick = (refObj:any,setshowContent:any) => {

//    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
//       if(e.target === refObj.current){
//         setshowContent(false);
//       }
//       else{
//         return;
//       }
//    }

//     useEffect(() => {
//       refObj.current.addEventListener('click', clickHandler);

//       return () => {
//         refObj.current.removeEventListener('click',clickHandler);
//       }
//     },[])
// }

// export default UseOutsideClick




// WAY - 2 [OPTIMISED WAY]

//IN FIRST WAY THE REF OBJECET WAS ATTACHED TO THE OUTER DIV WHILE IN THIS WAY THE REF OBJECT WILL BE ATTCAHED TO THE INNER DIV AND WE WILL USE A METHOD OFF REF.CUURENT I.E "CONTAINS()" METHOD TO CHECK IF  THE ELELMENT ON WHICH WE CLICKED IS A CHILD OF THE ELEMENT REFERENCED BY REFOBJ OR IS IT A CHIILD OF INNER DIV???

//IF YES THEN WE WILL RETURN BUT IF NO WE WILL CLOSE THE CONTENT MEANS SET THE SHOWCONTENT STATE VARIABLE FALSE....

//IN PREVIOUS METHOD WE WERE ADDING EVENT LISTNER ONLY TO THE DIV BUT HERE FOR BETTER EXPERIENCE WE WILL ADD IT IN WHOLE DOCUMENT USING DOCMENT OBJECT SO THAT  UPON CLCIKINNG ON ANY PLACE IN THE WHOLE WEB PAGE(DOCUMENT) EXPCEPT THE INNER DIV THE DIV WILL GET CLOSED

//ASLO  HERE WE WILL USE "MOUUSEDOWN" EVENT FOR FIRST TIME FOR FAST EVENT FIRING....HOW THIS NEW EVENT WILL LEAD TO FAST EVENT FIRING????

//BECAUSE IF WE USE "CLICK" EVENT THEN EVENT FIRES OR EVENThANDLER FUNCTION GET CALLED AFTER BUT IS PRESSED AND RELEASED[A COMPLETE CLICK] BUT IN THIS EVENT EVENT IS FIRED WHEN BUTTON IS PRESSED ONLY.....


const UseOutsideClick = (refObj:any, setshowContent:any) => {

    //here might a question arise that in other event objects type i was writing some different things like:- React.MouseEvent<......> etc but here why only MouseEvent?????

    //because when we handle event taking place in noraml html elemnts we follow first way but when we handle event taking place in document object then we use second path

   const eventHandler = (e:MouseEvent) => {
    if(refObj.current && !refObj.current.contains(e.target)){
        setshowContent(false);
    }else{
        return;
    }
   }

      useEffect(() => {

        document.addEventListener('mousedown',eventHandler);
        
        return () => {
            document.removeEventListener('mousedown',eventHandler);
        }

      },[]);
}

export default UseOutsideClick