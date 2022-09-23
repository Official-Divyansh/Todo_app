import React, { useEffect, useMemo, useState } from 'react'
import ActiveNotes from './ActiveNotes'
import AllNotes from './AllNotes'
import Complete from './Complete'

export default function Layout() {
    const [todo, setTodo] = useState(["hey"])
    const [value, setValue] = useState()
    const [isCompleted, setIsCompleted] = useState(false)
    const [mapData, setMapData] = useState([])
    const [change, setChange] = useState()
    const [activeTab, setActiveTab] = useState('All')
    const [search, setSearch] = useState('')

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
       console.log(JSON.parse(getNotesFromLocalStorage))
   
      },[change])

      useEffect(() => {
         const getNotesFromLocalStorage = localStorage.getItem("notes")
         const searchData = JSON.parse(getNotesFromLocalStorage)
         let stack = []
         for(var i = 0; i < searchData.length; i++) {
                if (searchData[i].value.includes(search) && search.length > 0) {
                        console.log(searchData[i].value)
                        stack.push(searchData[i])
                }
                        console.log("change")
            }
            if(search.length > 0)
            setMapData(stack)

            if(search.length == 0){
               setMapData(searchData)
            }
      }, [search])
  return (
    <div  className=" w-[80%] sm:w-[60%] mt-4">
       <div className='flex items-end -translate-y-20 '>
        <input type="text" placeholder="Search task here"  className="bg-white w-full border-[1px] border-gray-500 mt-6 rounded-lg outline-none p-2 mr-6" onChange={(e)=> setSearch(e.target.value.toUpperCase())} />
        </div>
       <h1 className="font-extrabold text-3xl text-center">#todo</h1>
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
        <input type="text" placeholder="Add task" value={value} className="bg-white w-full border-[1px] border-gray-500 mt-6 rounded-lg outline-none p-2 mr-6" onChange={(e)=> setValue(e.target.value.toUpperCase())} />

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
