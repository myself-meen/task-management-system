import React, {

    useEffect,
    useState

} from 'react'

import PageContainer from '../components/layout/PageContainer'

import EmployeeTable from '../components/Table/EmployeeTable'

import Search from '../components/ui/Search'

import { IoFilterOutline } from "react-icons/io5"

import AddEmployee from '../components/forms/AddEmployee'

import FilterMenuEmp from '../components/filter/FilterMenuEmp'

import EmployeeCard from '../components/card/EmployeeCard'

import PageHeader from '../components/ui/PageHeader'

import { useIsMobile } from '../CustomHooks/useIsMobile'

import { usePagination } from '../CustomHooks/usePagination'

import Pagination from '../components/ui/Pagination'

import {

    getEmployees,
    postEmployees,
    putEmployees,
    deleteEmployees

} from '../services/employeeService'




function Employees() {


    const [addEmployee, setAddEmployee] = useState(false)

    const [openFilter, setOpenFilter] = useState(false)

    const [employees, setEmployees] = useState([])

    const [departments, setDepartments] = useState([])




    const [filters, setFilters] = useState({

        department: '',

        role: '',

        search: ''

    })




    const isMobile = useIsMobile()


    const handleSearchChange = (event) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            search: event.target.value
        }))
    }




    useEffect(() => {

        fetchEmployees()

    }, [filters])




    useEffect(() => {

        fetchDepartments()

    }, [])




    const fetchEmployees = async () => {

        try {

            const data = await getEmployees(filters)


            const formattedEmployees = data.map((employee) => ({

                id: employee.employee_id,

                name: employee.employee_name,

                email: employee.employee_mail,

                department: employee.department_name,

                role: employee.role_name,

                department_id: employee.department_id,

                role_id: employee.role_id

            }))


            setEmployees(formattedEmployees)

        }

        catch(error) {

            console.log(error)

        }

    }




    const fetchDepartments = async () => {

        try {

            const response = await fetch(

                'http://127.0.0.1:5000/v1/departments'

            )


            const data = await response.json()

            setDepartments(data)

        }

        catch(error) {

            console.log(error)

        }

    }




    const handleAddEmployee = async (

        newEmployeeData

    ) => {

        try {

            const response = await postEmployees(

                newEmployeeData

            )


            if (response.error) {

                alert(response.error)

                return

            }


            await fetchEmployees()

            setAddEmployee(false)

        }

        catch(error) {

            console.log(error)

            alert("Something went wrong")

        }

    }




    const handleDeleteEmployee = async (

        id

    ) => {

        try {

            const response = await deleteEmployees(id)


            if (response.error) {

                alert(response.error)

                return

            }


            await fetchEmployees()

        }

        catch(error) {

            console.log(error)

            alert("Something went wrong")

        }

    }




    const handleEditEmployee = async (

        updatedEmployee

    ) => {

        try {

            const response = await putEmployees(

                updatedEmployee

            )


            if (response.error) {

                alert(response.error)

                return

            }


            await fetchEmployees()

        }

        catch(error) {

            console.log(error)

            alert("Something went wrong")

        }

    }




    const {

        currentPage,
        totalPages,
        currentData,
        handlePrev,
        handleNext

    } = usePagination(employees)




    return (

        <>

            <PageContainer>


                <div className='flex flex-col gap-y-8'>


                    <PageHeader

                        head='Employee Directory'

                        subhead='Manage your organizations talent and departments'

                    />




                    <section className='flex md:justify-between gap-4'>


                        <Search
                            value={filters.search}
                            onChange={handleSearchChange}
                        >
                            Search Employees . . .
                        </Search>




                        <div className='flex gap-4'>


                            <div className='flex'>


                                {

                                    filters.department ||

                                    filters.role ||

                                    filters.search ? (

                                        <button

                                            className='text-gray-500 text-sm mr-2'

                                            onClick={() =>

                                                setFilters({

                                                    department: '',

                                                    role: '',

                                                    search: ''

                                                })

                                            }

                                        >

                                            x Clear

                                        </button>

                                    ) : null

                                }




                                <button

                                    className='px-4 py-2 rounded-xl transition-all duration-150 ease-in-out active:scale-95 flex bg-white shadow-md gap-2 items-center'

                                    onClick={() =>

                                        setOpenFilter(

                                            !openFilter

                                        )

                                    }

                                >

                                    <IoFilterOutline />




                                    {

                                        isMobile

                                            ? ''

                                            : 'Filter'

                                    }

                                </button>




                                {

                                    openFilter && (

                                        <FilterMenuEmp

                                            setOpenFilter={setOpenFilter}

                                            setFilters={setFilters}

                                            employees={employees}

                                        />

                                    )

                                }

                            </div>




                            <button

                                className='px-4 py-2 rounded-xl transition-all duration-150 ease-in-out active:scale-95 flex bg-[#4271D0] text-white shadow-md gap-2 items-center'

                                onClick={() =>

                                    setAddEmployee(

                                        !addEmployee

                                    )

                                }

                            >

                                {

                                    isMobile

                                        ? '+'

                                        : 'Add Employee'

                                }

                            </button>

                        </div>

                    </section>




                    <section className='employees'>


                        {

                            isMobile ? (

                                <div className="flex flex-col gap-4">


                                    {

                                        currentData.map(

                                            (employee) => (

                                                <EmployeeCard

                                                    key={employee.id}

                                                    employee={employee}

                                                    departments={departments}

                                                    onDeleteEmployee={handleDeleteEmployee}

                                                    onEditEmployee={handleEditEmployee}

                                                />

                                            )

                                        )

                                    }




                                    <Pagination

                                        currentPage={currentPage}

                                        totalPages={totalPages}

                                        handlePrev={handlePrev}

                                        handleNext={handleNext}

                                    />

                                </div>

                            ) : (

                                <EmployeeTable

                                    employees={employees}

                                    departments={departments}

                                    onDeleteEmployee={handleDeleteEmployee}

                                    onEditEmployee={handleEditEmployee}

                                />

                            )

                        }

                    </section>

                </div>

            </PageContainer>




            {

                addEmployee && (

                    <AddEmployee

                        departments={departments}

                        onClose={() =>

                            setAddEmployee(false)

                        }

                        onAddEmployee={handleAddEmployee}

                    />

                )

            }

        </>

    )

}




export default Employees