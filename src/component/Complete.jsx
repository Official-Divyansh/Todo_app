import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function Complete({setMapData, mapData,change , setChange}) {

   const [showText, setShowText] = useState(false)

    const deleteTodo = (index)=>{
        const getValue = localStorage.getItem("notes")
        let notes = []
            notes = JSON.parse(getValue)
            console.log(index)
            notes.splice(index, 1)
        localStorage.setItem("notes", JSON.stringify(notes))
        setMapData(notes)
        console.log(notes, "notes")
         setChange(!change)
    }



  return (
    <div className='mt-2'>
        {
        mapData && mapData.map((data,index)=>(
            <div className='flex items-center justify-between mt-[6px]'>
                {
                    data.isCompleted && (
                        <>
                        <div className='flex'>
                        <input type="checkbox"  checked="true" />
                        <p className='ml-4 text-md font-semibold  line-through
                     '>{data.value}</p>
                </div>
                <TrashIcon className='h-4 w-4' onClick={()=>deleteTodo(index)} />
                     </>
                    )
                }

        </div>
         ))
        }
          

    </div>
  )
}