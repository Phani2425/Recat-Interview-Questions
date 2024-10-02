

import React from 'react'
import TreeviewChild from './TreeviewChild'

interface Treeview {
    id : number;
    label : string;
    link:string;
    children : Treeview[];
}

interface TreeviewParentProps {
    data : Treeview[]
}


const TreeviewParent: React.FC<TreeviewParentProps> = ({data = []}) => {
  return (
    <>
         {
            data.length && data.map((item) => (
                <TreeviewChild item={item}/>
            ))
         }
    </>
  )
}

export default TreeviewParent