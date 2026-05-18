import React, { useState } from 'react';
import Badge from './Badge';
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenu from './ThreeDotMenu';
import EditTask from '../forms/EditTask';

function TaskCard({ task }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    return ( <>
    <div className='p-4 flex flex-col gap-4 bg-white shadow-md rounded-xl border border-gray-100 relative'>
        <div className='flex justify-between items-start'>
        <div>
        <h1 className='text-lg font-semibold text-gray-800'>{task.name}</h1>
         <p className='text-sm text-gray-500 mt-1'>Assigned to: {task.assignee}</p>
         </div>
        <div className="flex items-center gap-2">
            <Badge stat={task.priority}/>
            <button onClick={() => setOpenMenu(!openMenu)}>
                <BsThreeDotsVertical />
            </button>
        </div>
        {openMenu && (
            <div className="absolute top-12 right-4">
                <ThreeDotMenu 
                    onEdit={() => { setEditingTask(task); setOpenMenu(false); }} 
                    onDelete={() => console.log('Delete task:', task.id)}
                    onComplete={() => console.log('Complete task:', task.id)}
                />
            </div>
        )}
        </div>
       
        <div className='flex justify-between items-center'>
        <h2 className='text-sm font-medium text-gray-600'>Due: {task.dueDate}</h2>
        <Badge stat={task.status}/>
        </div>

    </div>
    {editingTask && <EditTask task={editingTask} onClose={() => setEditingTask(null)} />}
    </> );
}

export default TaskCard;