import React, { useEffect, useState } from 'react'

export default function AllNotes({setMapData, mapData, setChange}) {
   
    const checkIsCompleted = (e,index)=>{
        setChange(e.target.checked)
        const getValue = localStorage.getItem("notes")
        let notes = []
            notes = JSON.parse(getValue)
      
        notes[index].isCompleted = e.target.checked
        localStorage.setItem("notes", JSON.stringify(notes))
        setMapData(notes)

    }

  return (
    <div className='h-[100%] overflow-auto'>
        {
        mapData && mapData.map((data,index)=>(
            <div className='flex items-center mt-4'>
                {
                    data.isCompleted ? (
                        <>
                        <input type="checkbox" checked="true" onChange={(e)=> checkIsCompleted(e,index)} className="line-through"/>
                        <p className='ml-4 text-md font-semibold line-through
                     '>{data.value}</p>
                     </>
                    )
                    : (
                        <>
                        <input type="checkbox" onChange={(e)=> checkIsCompleted(e,index)}/>
                        <p className='ml-4 text-md font-semibold'>{data.value}</p>
                     </>
                    )
                }
        </div>
         ))
        }

        {
            mapData == 0 &&
        <div className='h-[100%] w-[100%] flex items-center justify-center text-gray-500 font-bold'>
            <h1>Please ADD task</h1>
        </div>
        }
    </div>
  )
}
