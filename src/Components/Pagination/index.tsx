import React, { useEffect, useState } from 'react'
import PageNavigation from './PageNavigation';
import SinglePage from './SinglePage';

type Props = {}

const dummyData = Array.from({ length: 50 }, (_, index) => ({
    name: `product ${index + 1}`
  }));
  

const Pagination = (props: Props) => {

  //basically we want to have 10 items oon one page
  const totalPage = dummyData.length / 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startIndex,setstartIndex] = useState<number>((currentPage*10)-10);

  useEffect(()=>{
    setstartIndex((currentPage*10)-10);
  },[currentPage])

  return (
    <div className= 'my-10 w-9/12 mx-auto flex flex-col gap-4 items-center'>
        <h1 className='font-bold text-3xl'>Pagination</h1>
        <SinglePage pageData = {dummyData.slice(startIndex, startIndex+10)} />
        <PageNavigation  totalPage={totalPage} currentPage={currentPage} setCurrentPage = {setCurrentPage} />
    </div>
  )
}

export default Pagination



//LEARINGS:-

//working and difference betwween slice() [do not change the original array it just used to return the selected elements from the array..] , and splice() [changes the original array , it can remove items and add item in the array....... returns the removed elements from the array if there is any] method  of array, also revised the split() method of strings

//slice() takes a start index and end index and return them

//splice() -> start index,no of element to be removed, elements to be added in in the array (written by comma separation)

//learned Array.from() method....


