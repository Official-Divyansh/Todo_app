import React, { useEffect, useState } from 'react'
import ActiveNotes from './ActiveNotes'
import AllNotes from './AllNotes'
import Complete from './Complete'

export default function Layout() {
    const [todo, setTodo] = useState(["hey"])
    const [value, setValue] = useState()
    const [isCompleted, setIsCompleted] = useState(false)
    const [mapData, setMapData] = useState()
    const [change, setChange] = useState()
    const [activeTab, setActiveTab] = useState('All')

    const AddTodo = ()=>{
       const getValue = localStorage.getItem("notes")
       if(value.length > 0){

          let notes = []
          if(getValue != null){
             notes = JSON.parse(getValue)
            }
            
            notes.push({
               value, isCompleted
            })
            setMapData(notes)
            localStorage.setItem("notes", JSON.stringify(notes))
            console.log(notes)
            setValue('')
         }
    }
    
    const clearAll = ()=>{
   
         let notes = mapData
         let notes2 = []
            for(let i = 0;i<notes.length;i++){
               if(notes[i].isCompleted != true){
                  notes2.push(notes[i])
               }
            }
            localStorage.setItem("notes", JSON.stringify(notes2))
           setMapData(notes2)
           setChange(!change)
    }
    const underL = {
        borderBottom: '1px solid blue'
    }

    useEffect(()=>{
      const getNotesFromLocalStorage = localStorage.getItem("notes")
      setMapData(JSON.parse(getNotesFromLocalStorage))
      console.log(mapData)
    },[change])
  return (
    <div  className=" w-[80%] sm:w-[60%] mt-4">
        <div className='flex  items-center justify-between border-b-[1px] border-gray-400 '>
         {
            activeTab == 'All' ?
            <h1 className='basis-[30%] text-center pb-2' style={underL}>All</h1>
            : 
            <h1 className='basis-[30%] text-center pb-2 cursor-pointer' onClick={()=>setActiveTab('All')}  >All</h1>
         }
         {
            activeTab == 'Active' ?
            <h1 className='basis-[30%] text-center pb-2 ' style={underL}>Active</h1>
            : 
            <h1 className='basis-[30%] text-center pb-2 cursor-pointer' onClick={()=>setActiveTab('Active')}  >Active</h1>
         }
         {
            activeTab == 'Complete' ?
            <h1 className='basis-[30%] text-center pb-2 ' style={underL}>Complete</h1>
            : 
            <h1 className='basis-[30%] text-center pb-2 cursor-pointer' onClick={()=>setActiveTab('Complete')}  >Complete</h1>
         }
           
        </div>
        {/* <hr></hr> */}
       {
           activeTab == 'All' &&
        <div className='flex items-end '>
        <input type="text" placeholder="Add task" value={value} className="bg-white w-full border-[1px] border-gray-500 mt-6 rounded-lg outline-none p-2 mr-6" onChange={(e)=> setValue(e.target.value)} />

        <button className='bg-blue-500 text-white px-10 py-2 rounded-lg ml-4' onClick={AddTodo}>ADD</button>
        </div>
       }


 <div className='h-[40vh] overflow-auto'>

        {
           activeTab == 'All' &&
           <AllNotes setMapData={setMapData} mapData={mapData} setChange={setChange}/>
           
         }
         {
            activeTab == 'Active' &&
            <ActiveNotes setMapData={setMapData} mapData={mapData} change={change} setChange={setChange} />
         }
         {
            activeTab == 'Complete' &&
            <Complete setMapData={setMapData} mapData={mapData} change={change} setChange={setChange} />
         }
      
         </div>
         {
            activeTab == 'Complete' &&
            <button className=' float-right px-8 py-2 rounded-xl text-white bg-red-500' onClick={clearAll}>Clear All</button>
         }

        </div>
  )
}


// let notes = []
// const getKeyFromLocalStorage = JSON.parse(localStorage.getItem("key"))
// console.log(getKeyFromLocalStorage, "console")
// notes.push(...getKeyFromLocalStorage , value)
// // setTodo(notes)
// setCompArray([...compArray, false])
// localStorage.setItem("key", JSON.stringify(notes))
// localStorage.setItem("isCompleted", JSON.stringify(compArray))

// const AllTodo = JSON.parse(localStorage.getItem("key"))
// console.log(AllTodo)
// setTodoMap(AllTodo)
