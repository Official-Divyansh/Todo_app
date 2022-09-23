import React, { useEffect, useState } from 'react'

export default function ActiveNotes({setMapData, mapData, change, setChange}) {

    const checkIsCompleted = (e,index)=>{
        setChange(e.target.checked)
        const getValue = localStorage.getItem("notes")
        let notes = []
            notes = JSON.parse(getValue)
      
        console.log(index)
        console.log(notes[index])
        notes[index].isCompleted = e.target.checked
        localStorage.setItem("notes", JSON.stringify(notes))
        setMapData(notes)
        console.log(notes)

    }

   

  return (
    <div className='mt-6'>
        {
        mapData && mapData.map((data,index)=>(
            <div className='flex items-center mt-2 '>
                {
                    !data.isCompleted && (
                        <>
                        <input type="checkbox" onChange={(e)=> checkIsCompleted(e,index)} className="line-through"/>
                        <p className='ml-4 text-md font-semibold
                     '>{data.value}</p>
                     </>
                    )
                }
        </div>
         ))
        }
    
    </div>
  )
}