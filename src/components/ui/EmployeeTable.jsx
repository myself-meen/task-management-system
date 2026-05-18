import React from 'react';
function EmployeeTable({employees=[]}) {
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
              <tr key={employee.id} className="hover:bg-gray-50 text-black text-xs">
                 <td className="py-2 px-4 border-b border-[#C3C6D4]" >
                     <Avatar employee_name={employee.name}/>
                     <span>{employee.name}</span>
                     <span className='text-[#434652]'>{employee.email}</span>
                </td>
               
                <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <span >{employee.department}</span>
                </td>
                 <td className="py-2 px-4 border-b border-[#C3C6D4]">
                  <span>{employee.role}</span>
                </td>
                <td className="py-2 px-4 border-b border-[#C3C6D4] "><button><BsThreeDotsVertical/></button></td>
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
    </> );
}

export default EmployeeTable;