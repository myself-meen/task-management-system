import React, {useEffect,useState} from 'react'
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
import {getEmployees,postEmployees,putEmployees,deleteEmployees} from '../services/employeeService'
function Employees() {
    const [addEmployee, setAddEmployee] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState({ type: '', message: '' })
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
    const ensureDepartments = async () => {
        if (departments.length === 0) {
            await fetchDepartments()
        }
    }
    const fetchEmployees = async () => {
        setIsLoading(true)
        setFeedback({ type: '', message: '' })
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
            setFeedback({ type: 'error', message: error.message || 'Unable to load employees.' })
        }
        finally {
            setIsLoading(false)
        }
    }
    const fetchDepartments = async () => {
        try {
            const data = await getEmployees({})
            setDepartments(data)
        }
        catch(error) {
            setFeedback({ type: 'error', message: error.message || 'Unable to load departments.' })
        }

    }
    const handleAddEmployee = async (newEmployeeData) => {
        setFeedback({ type: '', message: '' })
        try {
            const response = await postEmployees(newEmployeeData)
            if (response.error) {
                setFeedback({ type: 'error', message: response.error })
                return
            }
            await fetchEmployees()
            setAddEmployee(false)
            setFeedback({ type: 'success', message: 'Employee added successfully.' })
        }
        catch(error) {
            setFeedback({ type: 'error', message: error.message || 'Unable to add employee.' })
        }
    }

    const handleDeleteEmployee = async (id) => {
        setFeedback({ type: '', message: '' })
        try {
            const response = await deleteEmployees(id)
            if (response.error) {
                setFeedback({ type: 'error', message: response.error })
                return
            }
            await fetchEmployees()
            setFeedback({ type: 'success', message: 'Employee deleted successfully.' })
        }
        catch(error) {
            setFeedback({ type: 'error', message: error.message || 'Unable to delete employee.' })
        }
    }
    const handleEditEmployee = async (updatedEmployee) => {
        setFeedback({ type: '', message: '' })
        try {
            const response = await putEmployees(updatedEmployee)
            if (response.error) {
                setFeedback({ type: 'error', message: response.error })
                return
            }
            await fetchEmployees()
            setFeedback({ type: 'success', message: 'Employee updated successfully.' })
        }
        catch(error) {
            setFeedback({ type: 'error', message: error.message || 'Unable to update employee.' })
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
                    <PageHeader head='Employee Directory' subhead='Manage your organizations talent and departments'/>
                    <section className='flex md:justify-between gap-4'>
                        <Search value={filters.search} onChange={handleSearchChange}>
                            Search Employees . . .
                        </Search>
                        <div className='flex gap-4'>
                            <div className='flex'>
                                {
                                    filters.department ||
                                    filters.role ||
                                    filters.search ? (
                                        <button className='text-gray-500 text-sm mr-2' onClick={() =>
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
                                        isMobile? '': 'Filter'
                                    }
                                </button>
                                {
                                    openFilter && (
                                        <FilterMenuEmp setOpenFilter={setOpenFilter} setFilters={setFilters} employees={employees}/>
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
                    {feedback.message ? (
                        <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-red-200 bg-red-50 text-red-600' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                            {feedback.message}
                        </div>
                    ) : null}
                    <section className='employees'>

                        {isLoading ? (
                            <div className='rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500'>Loading employees...</div>
                        ) : (
                            isMobile ? (

                                <div className="flex flex-col gap-4">


                                    {

                                        currentData.map(

                                            (employee) => (

                                                <EmployeeCard

                                                    key={employee.id}

                                                    employee={employee}

                                                    departments={departments}
                                                    ensureDepartments={ensureDepartments}

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
                                    ensureDepartments={ensureDepartments}
                                    onDeleteEmployee={handleDeleteEmployee}
                                    onEditEmployee={handleEditEmployee}
                                />
                            )
                        )}
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