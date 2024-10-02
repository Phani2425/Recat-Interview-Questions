import { useState } from "react";
import navData from "./data";

const Treeview = () => {
  const [activeElement, setactiveElement] = useState<any>([]);

  const ClickHandler = (id:number) => {
     if(!activeElement.includes(id)){
         setactiveElement((prevData:any) => {return [...prevData,id]});
         console.log('aciveElement =  ', activeElement);
     }else{
        setactiveElement(activeElement.filter((elem:any) => elem !== id));
        console.log('aciveElement =  ', activeElement);
     }
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute bg-blue-600 text-white left-0 w-[30%] h-full px-3 py-2">
        {navData &&
          navData.navigation.length > 0 &&
          navData.navigation.map((elem) => (
            <div className="py-2 text-xl font-semibold">
              <div onClick={() => {ClickHandler(elem.id)}} className="flex justify-between items-center w-[90%]  cursor-pointer">
                <div>{elem.label}</div>
                {
                    elem.children.length >0 && <span>{activeElement.includes(elem.id) ? '-' : '+'}</span>
                }
              </div>
              {elem.children.length > 0 && activeElement.includes(elem.id) &&
                elem.children.map((child) => (
                  <div className="flex flex-col gap-2" >
                    <div onClick={() => {ClickHandler(child.id)}} className="flex justify-between items-center ml-3 w-[90%] cursor-pointer">
                    <div>{child.label}</div>
                    {
                    child.children.length >0 && <span>{activeElement.includes(child.id) ? '-' : '+'}</span>
                }
                  </div>
                  {
                    child.children.length > 0 && activeElement.includes(child.id) && child.children.map((grandChild) => (
                        <div className="flex justify-between items-center ml-6 w-[90%] cursor-pointer">
                    <div>{grandChild.label}</div>
                    {
                    grandChild.children.length >0 && <span>+</span>
                }
                  </div>
                    ))
                  }
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Treeview;

// this question is very very important as interviewr can ask for
// 1. tree view menu
// 2. recursive menu
// 3. nested navigation bar
// 4. dynamic navigation bar
// 5. on the basis of some json data you have to render the naviagtionn bar and on the bsisi of that you have to render the pages associated with it

//so here we will use some json data to do this


//THIS TREE VIEW COMPONENT IS MANUALLY CODED MEANS IT CAN HANDLE THE DATA WHICH HAVE MAXIMUM TWO LEVEL LAYER IF THE 2ND LEVEL HAVE CHILDRENS THEN TO RENDER THOSE CHILDREN I HAVE TO CODE THAT MANUALLY AND ALSO THE CODE HERE SEEMS SO COMPLEX

//SO I WILL USE ANOTHER METHOD TO BUILD THIS BUT IN THAT CASE THE CODE CAN HANDLE ANY NO OF LAYERS IN IT SO LETS DO THAT
