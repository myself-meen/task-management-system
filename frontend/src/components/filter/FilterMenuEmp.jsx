import React from 'react'

import { useClickOutside } from '../../CustomHooks/useClickOutside'

function FilterMenuEmp({

    setOpenFilter,
    setFilters,
    employees = []

}) {

    const departments = [

        ...new Map(

            employees.map(

                emp => [

                    emp.department_id,

                    {

                        id: emp.department_id,

                        name: emp.department

                    }

                ]

            )

        ).values()

    ]




    const roles = [

        ...new Map(

            employees.map(

                emp => [

                    emp.role_id,

                    {

                        id: emp.role_id,

                        name: emp.role

                    }

                ]

            )

        ).values()

    ]




    const domref = useClickOutside(() => {

        setOpenFilter(false)

    })




    const applyFilter = (

        type,
        value

    ) => {

        if (type === 'department') {

            setFilters({

                department: value,

                role: '',

                search: ''

            })

        }




        if (type === 'role') {

            setFilters({

                department: '',

                role: value,

                search: ''

            })

        }




        setOpenFilter(false)

    }




    return (

        <>

            <div

                ref={domref}

                className='absolute max-md:right-4 mt-12 w-48 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'

            >


                <div className="flex flex-col overflow-y-auto max-h-64 pb-2">


                    <button

                        onClick={() => {

                            setFilters({

                                department: '',

                                role: '',

                                search: ''

                            })

                            setOpenFilter(false)

                        }}

                        className="text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b"

                    >

                        All Employees

                    </button>




                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2">

                        By Department

                    </div>




                    {

                        departments.map((dept, index) => (

                            <button

                                key={`dept-${index}`}

                                onClick={() =>

                                    applyFilter(

                                        'department',

                                        dept.id

                                    )

                                }

                                className="text-left px-4 py-2 hover:bg-gray-100"

                            >

                                {dept.name}

                            </button>

                        ))

                    }




                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2 border-t pt-2">

                        By Role

                    </div>




                    {

                        roles.map((role, index) => (

                            <button

                                key={`role-${index}`}

                                onClick={() =>

                                    applyFilter(

                                        'role',

                                        role.id

                                    )

                                }

                                className="text-left px-4 py-2 hover:bg-gray-100"

                            >

                                {role.name}

                            </button>

                        ))

                    }

                </div>

            </div>

        </>

    )

}




export default FilterMenuEmp