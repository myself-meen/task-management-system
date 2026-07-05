// import React from 'react';
// import Avatar from '../ui/Avatar';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import ThreeDotMenuEmp from '../ui/ThreeDotMenuEmp';
// import EditEmployee from '../forms/EditEmployee';
// import { useState } from 'react';
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { usePagination } from '../../CustomHooks/usePagination';
// function EmployeeTable({employees=[],onDeleteEmployee, onEditEmployee}) {
//   const [openMenuId, setOpenMenuId] = useState(null);
  
//     const [editingEmployee, setEditingEmployee] = useState(null);
   
    
     
//       const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(employees);
//     return ( <>
//     <div className="overflow-x-auto rounded-md">
//         <table className="min-w-full bg-white border border-[#C3C6D4] ">
//           <thead>
//             <tr className="bg-white">
//               <th colSpan="6" className="py-4 px-4 text-left text-lg font-semibold text-gray-800 border-b border-[#C3C6D4]">
//                 Staff Overview
//               </th>
//             </tr>
//             <tr className="bg-[#F2F3FB] text-[#434652] text-xs">
//               <th className="py-2 px-4  text-left uppercase">employee</th>
//               <th className="py-2 px-4  text-left uppercase">department</th>
//               <th className="py-2 px-4  text-left uppercase">role</th>
//               <th className="py-2 px-4  text-left uppercase">action</th>
            
//             </tr>
//           </thead>
//           <tbody>
            
//             {currentData.map((employee) => (
//               <tr key={employee.id} className="hover:bg-gray-50">
//                 <td className="p-4 border-b border-[#C3C6D4]">
//                   <div className="inline-block align-middle">
//                     <Avatar employee_name={employee.name} />
//                   </div>
//                   <span className="inline-block align-middle ml-2">
//                     <div>{employee.name}</div>
//                     <div className="text-[#434652]">{employee.email}</div>
//                   </span>
//                 </td>
               
//                 <td className="py-2 px-4 border-b border-[#C3C6D4]">
//                   <span >{employee.department}</span>
//                 </td>
//                  <td className="py-2 px-4 border-b border-[#C3C6D4]">
//                   <span>{employee.role}</span>
//                 </td>
//                 <td className="py-2 px-4 border-b border-[#C3C6D4] "><button onClick={()=>setOpenMenuId(openMenuId === employee.id ? null : employee.id)}><BsThreeDotsVertical/></button>
//                   {openMenuId === employee.id && (
//                     <ThreeDotMenuEmp 
//                       onEdit={() => { setEditingEmployee(employee); setOpenMenuId(null); }} 
//                       onRemove={() => onDeleteEmployee(employee.id)}
//                       onClose={()=>setOpenMenuId(null)} //Add Backend delete logic.
//                           />
//                   )}
                 
                
                
                
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className="bg-[#F2F3FB]">
//             <tr>
//               <td colSpan="6" className="py-3 px-4 border-t border-[#C3C6D4]">
//                 <div className="flex justify-between items-center text-sm text-[#434652]">
//                   <span>Showing {currentData.length} of {employees.length} employees</span>
//                   <div className="flex gap-2">
//                                       <button disabled={currentPage === 1} onClick={handlePrev} className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FaArrowLeftLong/></button>
//                                       <button disabled={currentPage === totalPages||totalPages===0} onClick={handleNext} className="px-3 py-1  border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><FaArrowRightLong/></button>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//       {editingEmployee && <EditEmployee employee={editingEmployee} onClose={() => setEditingEmployee(null)} onEditEmployee={onEditEmployee} />}
//     </> );
// }

// export default EmployeeTable;

import React, { useState } from 'react'

import Avatar from '../ui/Avatar'

import { BsThreeDotsVertical } from "react-icons/bs"

import ThreeDotMenuEmp from '../ui/ThreeDotMenuEmp'

import EditEmployee from '../forms/EditEmployee'

import { FaArrowLeftLong } from "react-icons/fa6"

import { FaArrowRightLong } from "react-icons/fa6"

import { usePagination } from '../../CustomHooks/usePagination'




function EmployeeTable({

    employees = [],
    departments = [],
    ensureDepartments,
    onDeleteEmployee,
    onEditEmployee

}) {


    const [openMenuId, setOpenMenuId] = useState(null)

    const [editingEmployee, setEditingEmployee] = useState(null)




    const {

        currentPage,
        totalPages,
        currentData,
        handlePrev,
        handleNext

    } = usePagination(employees)




    return (

        <>

            <div className="overflow-x-auto rounded-md">


                <table className="min-w-full bg-white border border-[#C3C6D4]">


                    <thead>


                        <tr className="bg-white">

                            <th

                                colSpan="6"

                                className="py-4 px-4 text-left text-lg font-semibold text-gray-800 border-b border-[#C3C6D4]"

                            >

                                Staff Overview

                            </th>

                        </tr>




                        <tr className="bg-[#F2F3FB] text-[#434652] text-xs">


                            <th className="py-2 px-4 text-left uppercase">

                                employee

                            </th>


                            <th className="py-2 px-4 text-left uppercase">

                                department

                            </th>


                            <th className="py-2 px-4 text-left uppercase">

                                role

                            </th>


                            <th className="py-2 px-4 text-left uppercase">

                                action

                            </th>

                        </tr>

                    </thead>




                    <tbody>


                        {

                            currentData.map((employee) => (

                                <tr

                                    key={employee.id}

                                    className="hover:bg-gray-50"

                                >


                                    <td className="p-4 border-b border-[#C3C6D4]">


                                        <div className="inline-block align-middle">

                                            <Avatar

                                                employee_name={employee.name}

                                            />

                                        </div>




                                        <span className="inline-block align-middle ml-2">


                                            <div>

                                                {employee.name}

                                            </div>




                                            <div className="text-[#434652]">

                                                {employee.email}

                                            </div>

                                        </span>

                                    </td>




                                    <td className="py-2 px-4 border-b border-[#C3C6D4]">

                                        <span>

                                            {employee.department}

                                        </span>

                                    </td>




                                    <td className="py-2 px-4 border-b border-[#C3C6D4]">

                                        <span>

                                            {employee.role}

                                        </span>

                                    </td>




                                    <td className="py-2 px-4 border-b border-[#C3C6D4]">


                                        <button

                                            onClick={() =>

                                                setOpenMenuId(

                                                    openMenuId === employee.id

                                                        ? null

                                                        : employee.id

                                                )

                                            }

                                        >

                                            <BsThreeDotsVertical />

                                        </button>




                                        {

                                            openMenuId === employee.id && (

                                                <ThreeDotMenuEmp

                                                    onEdit={async () => {

                                                        if (ensureDepartments) await ensureDepartments()

                                                        setEditingEmployee(employee)

                                                        setOpenMenuId(null)

                                                    }}

                                                    onRemove={() =>

                                                        onDeleteEmployee(employee.id)

                                                    }

                                                    onClose={() =>

                                                        setOpenMenuId(null)

                                                    }

                                                />

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>




                    <tfoot className="bg-[#F2F3FB]">


                        <tr>


                            <td

                                colSpan="6"

                                className="py-3 px-4 border-t border-[#C3C6D4]"

                            >


                                <div className="flex justify-between items-center text-sm text-[#434652]">


                                    <span>

                                        Showing {currentData.length} of {employees.length} employees

                                    </span>




                                    <div className="flex gap-2">


                                        <button

                                            disabled={currentPage === 1}

                                            onClick={handlePrev}

                                            className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                                        >

                                            <FaArrowLeftLong />

                                        </button>




                                        <button

                                            disabled={

                                                currentPage === totalPages ||

                                                totalPages === 0

                                            }

                                            onClick={handleNext}

                                            className="px-3 py-1 border border-[#C3C6D4] rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                                        >

                                            <FaArrowRightLong />

                                        </button>

                                    </div>

                                </div>

                            </td>

                        </tr>

                    </tfoot>

                </table>

            </div>




            {

                editingEmployee && (

                    <EditEmployee

                        employee={editingEmployee}

                        departments={departments}

                        onClose={() =>

                            setEditingEmployee(null)

                        }

                        onEditEmployee={onEditEmployee}

                    />

                )

            }

        </>

    )

}




export default EmployeeTable