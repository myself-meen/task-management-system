import React, { useState } from 'react';
import Badge from '../ui/Badge';
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenu from '../ui/ThreeDotMenu';
import EditTask from '../forms/EditTask';

function TaskCard({ task, onDeleteTask, onEditTask, employees, ensureEmployees, hideMenu = false }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const isCompleted = String(task.status || '').trim().toLowerCase() === 'completed'

    return ( <>
    <div className='p-4 flex flex-col gap-4 bg-white shadow-md rounded-xl border border-gray-100 relative'>
        <div className='flex justify-between items-start'>
        <div className='min-w-0'>
        <h1 className='text-lg font-semibold text-gray-800 wrap-break-word whitespace-normal'>{task.name}</h1>
         <p className='text-sm text-gray-500 mt-1 wrap-break-words whitespace-normal'>Assigned to: {task.assignee}</p>
         </div>
        <div className="flex items-center gap-2">
            <Badge stat={task.priority}/>
            {!hideMenu && (
                <button onClick={() => setOpenMenu(!openMenu)}>
                    <BsThreeDotsVertical />
                </button>
            )}
        </div>
        {!hideMenu && openMenu && (
            <div className="absolute top-12 right-4">
                <ThreeDotMenu 
                    isCompleted={isCompleted}
                    onEdit={async () => { if (ensureEmployees) await ensureEmployees(); setEditingTask(task); setOpenMenu(false); }} 
                    onDelete={() => { onDeleteTask(task.id); setOpenMenu(false); }}
                    onComplete={() => {
                        if (!isCompleted) {
                            onEditTask({...task,  status: "completed" });
                        }
                        setOpenMenu(false);
                    }}
                    onClose={() => setOpenMenu(false)}
                />
            </div>
        )}
        </div>
       
        <div className='flex justify-between items-center'>
        <h2 className='text-sm font-medium text-gray-600'>Due: {task.dueDate}</h2>
        <Badge stat={task.status}/>
        </div>

    </div>
    {editingTask && <EditTask task={editingTask}   employees={employees} onClose={() => setEditingTask(null)} onEditTask={onEditTask} />}
        
    </> );
}

export default TaskCard;