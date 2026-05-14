import React from 'react';
import Badge from './Badge';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";

// We accept a 'tasks' prop and default it to an empty array so the app doesn't crash if no data is passed yet.
function TaskTable({ tasks = [] }) {
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
            
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 ">
                <td className="py-2 px-4 border-b border-[#C3C6D4] ">{task.name}</td>
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
                     <Avatar/>
                     <span>{task.assignee}</span>
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4] "><button><BsThreeDotsVertical/></button></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#F2F3FB]">
            <tr>
              <td colSpan="6" className="py-3 px-4 border-t border-[#C3C6D4]">
                <div className="flex justify-between items-center text-sm text-[#434652]">
                  <span>Showing {tasks.length} tasks</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors">Previous</button>
                    <button className="px-3 py-1  border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors">Next</button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
</> );
}

export default TaskTable;