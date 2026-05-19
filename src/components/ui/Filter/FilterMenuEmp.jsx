import React from 'react';
import { useClickOutside } from '../../../CustomHooks/useClickOutside';
function FilterMenuEmp({ setOpenFilter, employees = [] }) {
    
    const departments = [...new Set(employees.map(emp => emp.department))];
    const roles = [...new Set(employees.map(emp => emp.role))];
    const domref=useClickOutside(()=>{
        setOpenFilter(false);
    
    });

    return ( 
       <div ref={domref} className='absolute max-md:right-4  mt-12 w-48 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'>
        <div className="flex flex-col overflow-y-auto max-h-64 pb-2" onClick={() => setOpenFilter(false)}>
            <button className="text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b">All Employees</button>
            
            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2">By Department</div>
            {departments.map((dept, index) => (
                <button key={`dept-${index}`} className="text-left px-4 py-2 hover:bg-gray-100"> {dept}</button>
            ))}

            <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2 border-t pt-2">By Role</div>
            {roles.map((role, index) => (
                <button key={`role-${index}`} className="text-left px-4 py-2 hover:bg-gray-100"> {role}</button>
            ))}

        </div>
    </div>
    );
}

export default FilterMenuEmp;