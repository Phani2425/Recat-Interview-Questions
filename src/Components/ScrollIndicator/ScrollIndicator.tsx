import Navbar from "./Navbar"


const ScrollIndicator = () => {



  return (
    <div className="w-screen h-fit">
      <Navbar/>

      <div>
        <div className="w-full h-56 bg-blue-500"></div>
        <div className="w-full h-56 bg-green-500"></div>
        <div className="w-full h-56 bg-amber-400"></div>
        <div className="w-full h-56 bg-indigo-500"></div>
        <div className="w-full h-56 bg-fuchsia-500"></div>
        <div className="w-full h-56 bg-pink-500"></div>
        <div className="w-full h-56 bg-rose-500"></div>
        <div className="w-full h-56 bg-violet-600"></div>
        <div className="w-full h-56 bg-emerald-600"></div>
        <div className="w-full h-56 bg-cyan-500"></div>
        <div className="w-full h-56 bg-orange-500"></div>
      </div>
    </div>
  )
}

export default ScrollIndicator

//Learned hoe to write custom hook ... it is not different than the react function components just name it starting from Use and in return statement return the thing you want to have when you call the hook 
//in the hook you can use all other hooks like usestate, useeffect etc...

//learned the difference between sticky and fixed
//learned about css position property

//learned about:- window.scrollY  ///gives the height i have scrolled till now
//document.body.scrollHeight  ///gives the scrollable height of the webpage
//window.innerHeight ///gives the visible part

//learned about Number() and parseInt() function

//learned about toFixed() function -----> learned that it returns string which i have to convert to nuumber before using

//learned that taiilwind css can not understand when i use percentage in translate property............... for that i had to use style attribute [which requires {{}} ]

//learned why i did -100 in that tarnslate property???? think again.....

//learned how to addeventlistner and remove it in useEffect and why we do that and clearly understand how this project works