import React, { useState } from "react";
import TreeviewParent from "./TreeviewParent";

interface Item {
  id: number;
  label: string;
  link: string;
  children: Item[];
}

interface TreeviewChildProps {
  item: Item; // item prop is of type Item type
}

const TreeviewChild: React.FC<TreeviewChildProps> = ({ item }) => {
  const [activeElement, setactiveElement] = useState<any>([]);

  const ClickHandler = (id: number) => {
    if (!activeElement.includes(id)) {
      setactiveElement((prevData: any) => {
        return [...prevData, id];
      });
      console.log("aciveElement =  ", activeElement);
    } else {
      setactiveElement(activeElement.filter((elem: any) => elem !== id));
      console.log("aciveElement =  ", activeElement);
    }
  };

  return (
    <li className="list-none my-1 font-semibold text-lg">
      <div
        className=" cursor-pointer flex justify-between items-center hover:bg-blue-700 px-2 py-1"
        onClick={() => {
          ClickHandler(item.id);
        }}
      >
        <h1>{item.label}</h1>
        {item.children.length ? <span>{activeElement.includes(item.id) ? '-' : '+'}</span> : null}
      </div>

      {item.children.length && activeElement.includes(item.id) ? (
        <TreeviewParent data={item.children} />
      ) : null}
    </li>
  );
};

export default TreeviewChild;
