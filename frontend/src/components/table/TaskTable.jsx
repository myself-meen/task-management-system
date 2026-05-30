import React, { useEffect, useState } from 'react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenu from '../ui/ThreeDotMenu';
import EditTask from '../forms/EditTask';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useClickOutside } from '../../CustomHooks/useClickOutside';
import { usePagination } from '../../CustomHooks/usePagination';
import Employees from '../../pages/Employees';
function TaskTable({ tasks = [],onDeleteTask,onEditTask , employees }) {
  // Tracks which row's menu is open
  const [openMenuId, setOpenMenuId] = useState(null);
  // Tracks which task is actively being edited in the modal
  const [editingTask, setEditingTask] = useState(null);
  const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(tasks);
  

    return ( <>
    <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-[#C3C6D4] ">
          <thead>
            <tr className="bg-white">
              <th colSpan="6" className="py-4 px-4 text-left text-lg font-semibold text-gray-800 border-b border-[#C3C6D4]">
                Task List
              </th>
            </tr>
            <tr className="bg-[#F2F3FB] text-[#434652] text-xs">
              <th className="py-2 px-4  text-left uppercase">Task details</th>
              <th className="py-2 px-4  text-left uppercase">PRIORITY</th>
              <th className="py-2 px-4  text-left uppercase">status</th>
              <th className="py-2 px-4  text-left uppercase">due date</th>
              <th className="py-2 px-4  text-left uppercase">assignee</th>
              <th className="py-2 px-4  text-left uppercase"></th>
            </tr>
          </thead>
          <tbody>
            
            {currentData.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 px-4 py-4 ">
                <td className="p-6 border-b border-[#C3C6D4] ">{task.name}</td>
                <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <Badge stat={task.priority} />
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <Badge stat={task.status} />
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <span>{task.dueDate}</span>
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4]" >
                     <div className="inline-block align-middle">
                       <Avatar employee_name={task.assignee}/>
                     </div>
                     <span className="inline-block align-middle">{task.assignee}</span>
                </td>
                {/* Added 'relative' so the dropdown anchors to this cell */}
                <td className="py-2 px-4 border-b border-[#C3C6D4] relative">
                  <button onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}>
                    <BsThreeDotsVertical/>
                  </button>
                  {openMenuId === task.id && (
                    <ThreeDotMenu 
                      isCompleted={String(task.status || '').trim().toLowerCase() === 'completed'}
                      onEdit={() => { setEditingTask(task); setOpenMenuId(null); }} 
                      onDelete={()=>onDeleteTask(task.id)} 
                      onComplete={() => {
                          if (String(task.status || '').trim().toLowerCase() !== 'completed') {
                              onEditTask({...task,  status: 'completed' })
                          }
                          setOpenMenuId(null)
                      }} 
                      onClose={()=>setOpenMenuId(null)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#F2F3FB]">
            <tr>
              <td colSpan="6" className="py-3 px-4 border-t border-[#C3C6D4]">
                <div className="flex justify-between items-center text-sm text-[#434652]">
                  <span>Showing {currentData.length} of {tasks.length} tasks</span>
                  <div className="flex gap-2">
                    <button disabled={currentPage === 1} onClick={handlePrev} className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FaArrowLeftLong/></button>
                    <button disabled={currentPage === totalPages||totalPages===0} onClick={handleNext} className="px-3 py-1  border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FaArrowRightLong/></button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Render the Modal completely outside the table layout */}
      {editingTask && <EditTask task={editingTask} employees={employees} onClose={() => setEditingTask(null)}  onEditTask={onEditTask}  />}
</> );
}

export default TaskTable;