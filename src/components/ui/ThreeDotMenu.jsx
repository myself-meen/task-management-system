import React from 'react';
import { useClickOutside } from '../../CustomHooks/useClickOutside';

function ThreeDotMenu({ onEdit, onDelete,onComplete ,onClose}) {
     const domref=useClickOutside(()=>{
    onClose();
        
    })
   
    return ( <>
    <div ref={domref} className='absolute right-0 mt-2 w-32 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'>
        <div className="flex flex-col">
            <button onClick={onEdit} className="text-left px-4 py-2 hover:bg-gray-100">Edit</button>
            <button onClick={onComplete} className="text-left px-4 py-2 hover:bg-gray-100">Mark Complete</button>
            <button onClick={onDelete} className="text-left px-4 py-2 hover:bg-gray-100 text-red-600">Delete</button>

        </div>
    </div>
    </> );
}

export default ThreeDotMenu;