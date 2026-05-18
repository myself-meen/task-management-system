import React from 'react';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenuEmp from './ThreeDotMenuEmp';
import EditEmployee from '../forms/EditEmployee'
import { useState } from 'react';


function EmployeeTable({employees=[]}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  
    const [editingEmployee, setEditingEmployee] = useState(null);
    return ( <>
    <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-[#C3C6D4] ">
          <thead>
            <tr className="bg-white">
              <th colSpan="6" className="py-4 px-4 text-left text-lg font-semibold text-gray-800 border-b border-[#C3C6D4]">
                Staff Overview
              </th>
            </tr>
            <tr className="bg-[#F2F3FB] text-[#434652] text-xs">
              <th className="py-2 px-4  text-left uppercase">employee</th>
              <th className="py-2 px-4  text-left uppercase">department</th>
              <th className="py-2 px-4  text-left uppercase">role</th>
              <th className="py-2 px-4  text-left uppercase">action</th>
            
            </tr>
          </thead>
          <tbody>
            
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                 <td className="py-2 px-4 border-b border-[#C3C6D4] flex" >
                     <Avatar  employee_name={employee.name}/>
                     <span className='flex flex-col'>
                     <span>{employee.name}</span>
                     <span className='text-[#434652]'>{employee.email}</span>
                     </span>
                </td>
               
                <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <span >{employee.department}</span>
                </td>
                 <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <span>{employee.role}</span>
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4] "><button onClick={()=>setOpenMenuId(openMenuId === employee.id ? null : employee.id)}><BsThreeDotsVertical/></button>
                  {openMenuId === employee.id && (
                    <ThreeDotMenuEmp 
                      onEdit={() => { setEditingEmployee(employee); setOpenMenuId(null); }} 
                      onRemove={() => console.log('Delete employee:', employee.id)} //Add Backend delete logic.
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
                  <span>Showing {employees.length} employees</span>
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
      {editingEmployee && <EditEmployee employee={editingEmployee} onClose={() => setEditingEmployee(null)} />}
    </> );
}

export default EmployeeTable;