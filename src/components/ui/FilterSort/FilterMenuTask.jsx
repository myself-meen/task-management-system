import React from 'react';
import { IoFilterOutline } from "react-icons/io5";
function FilterMenuTask({setOpenFilter}) {
    return ( <>
       <div className='absolute mt-12 w-48 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'>
        <div className="flex flex-col overflow-y-auto max-h-64 pb-2" onClick={()=>setOpenFilter(false)}>
            <button  className="text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b">All Tasks</button>
            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2">By Status</div>
            <button  className="text-left px-4 py-2 hover:bg-gray-100"> Pending</button>
             <button  className="text-left px-4 py-2 hover:bg-gray-100">In Progress</button>
            <button  className="text-left px-4 py-2 hover:bg-gray-100"> Completed</button>
            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2">By Priority</div>
            <button  className="text-left px-4 py-2 hover:bg-gray-100">High</button>
             <button  className="text-left px-4 py-2 hover:bg-gray-100">Medium</button>
            <button  className="text-left px-4 py-2 hover:bg-gray-100">Low</button>
        

        </div>
    </div>
    </> );
}

export default FilterMenuTask;