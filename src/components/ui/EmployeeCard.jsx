import React, { useState } from 'react';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenuEmp from './ThreeDotMenuEmp';
import EditEmployee from '../forms/EditEmployee';

function EmployeeCard({ employee }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    return ( <>
    <div className='p-4 flex flex-col gap-4 bg-white shadow-md rounded-xl border border-gray-100 relative'>
        <div className='flex justify-between items-start'>
            <div className='flex gap-3 items-center'>
                <Avatar employee_name={employee.name} />
                <div>
                    <h1 className='text-lg font-semibold text-gray-800'>{employee.name}</h1>
                    <p className='text-sm text-gray-500 mt-1'>{employee.email}</p>
                </div>
            </div>
            <button onClick={() => setOpenMenu(!openMenu)}>
                <BsThreeDotsVertical />
            </button>
            {openMenu && (
                <div className="absolute top-10 right-4">
                    <ThreeDotMenuEmp 
                        onEdit={() => { setEditingEmployee(employee); setOpenMenu(false); }} 
                        onRemove={() => console.log('Delete employee:', employee.id)}
                    />
                </div>
            )}
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
            <div className='bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium'>{employee.department}</div>
            <div className='bg-[#F2F3FB] text-[#4271D0] px-3 py-1 rounded-md text-xs font-medium'>{employee.role}</div>
        </div>
    </div>
    {editingEmployee && <EditEmployee employee={editingEmployee} onClose={() => setEditingEmployee(null)} />}
    </> );
}

export default EmployeeCard;