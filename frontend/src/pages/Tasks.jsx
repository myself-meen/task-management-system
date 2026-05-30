import React, {
    useEffect,
    useState
} from 'react'
import PageContainer from '../components/layout/PageContainer'
import TaskTable from '../components/table/TaskTable'
import Search from '../components/ui/Search'
import { IoFilterOutline } from "react-icons/io5"
import FilterMenuTask from '../components/filter/FilterMenuTask'
import AddTask from '../components/forms/AddTask'
import PageHeader from '../components/ui/PageHeader'
import TaskCard from '../components/card/TaskCard'
import { useIsMobile } from '../CustomHooks/useIsMobile'
import { usePagination } from '../CustomHooks/usePagination'
import Pagination from '../components/ui/Pagination'
import {getTasks,postTasks,putTasks,deleteTasks} from '../services/taskService'
import {
    getEmployees
} from '../services/employeeService'
function Tasks() {
    const [addTask, setAddTask] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [tasks, setTasks] = useState([])
    const [employees, setEmployees] = useState([])
    const [filters, setFilters] = useState({
        priority: '',
        status: '',
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
        fetchTasks()
    }, [filters])

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchTasks = async () => {
        try {
            const data = await getTasks(filters)
            const formattedTasks = data.map((task) => {
                return {

        id: task.task_id,

        name: task.task_name,

        priority: task.task_priority,

        status: task.task_status,

        dueDate: task.task_dueDate
    ? new Date(task.task_dueDate)
        .toISOString()
        .split('T')[0]
    : '',

        assignee: task.employee_name,

        employee_id: task.employee_id

    

    }

})
            setTasks(formattedTasks)
        }
        catch(error) {
            console.log(error)
        }

    }


    const fetchEmployees = async () => {
        try {
            const data = await getEmployees()
            const formattedEmployees = data.map((employee) => {
                return {
                    id: employee.employee_id,
                    name: employee.employee_name
                }

            })
            setEmployees(formattedEmployees)
        }
        catch(error) {
            console.log(error)
        }

    }

    const handleAddTask = async (
        newTaskData
    ) => {
        try {
            const response = await postTasks(
                newTaskData
            )
            if (response.error) {
                alert(response.error)
                return
            }
            await fetchTasks()
            setAddTask(false)
        }
        catch(error) {
            console.log(error)

            alert("Something went wrong")

        }

    }

    const handleDeleteTask = async (
        id ) => {
        try {
            const response = await deleteTasks(id)
            if (response.error) {
                alert(response.error)
                return

            }

            await fetchTasks()
        }
        catch(error) {
            console.log(error)
            alert("Something went wrong")

        }

    }

    const handleEditTask = async (
        updatedTask

    ) => {

        try {
            const response = await putTasks(
                updatedTask
            )
            if (response.error) {
                alert(response.error)

                return

            }


            await fetchTasks()

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

    } = usePagination(tasks)




    return (

        <>

            <PageContainer>


                <div className='flex flex-col gap-y-8'>


                    <PageHeader

                        head='Task Management'

                        subhead='Oversee and track all organizational activities in real-time'

                    />




                    <section className='flex md:justify-between gap-4'>


                        <Search
                            value={filters.search}
                            onChange={handleSearchChange}
                        >
                            Search Tasks . . .
                        </Search>




                        <div className='flex gap-4'>


                            <div className='flex'>


                                {

                                    filters.priority ||

                                    filters.status ||

                                    filters.search ? (

                                        <button

                                            className='text-gray-500 text-sm mr-2'

                                            onClick={() =>

                                                setFilters({

                                                    priority: '',

                                                    status: '',

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

                                        <FilterMenuTask

                                            setOpenFilter={setOpenFilter}

                                            setFilters={setFilters}

                                        />

                                    )

                                }

                            </div>




                            <button

                                className='px-4 py-2 rounded-xl transition-all duration-150 ease-in-out active:scale-95 flex bg-[#4271D0] text-white shadow-md gap-2 items-center'

                                onClick={() =>

                                    setAddTask(!addTask)

                                }

                            >

                                {

                                    isMobile

                                        ? '+'

                                        : 'Add Task'

                                }

                            </button>

                        </div>

                    </section>




                    <section className='tasks'>


                        {

                            isMobile ? (

                                <div className="flex flex-col gap-4">


                                    {

                                        currentData.map((task) => (

                                            <TaskCard

                                                key={task.id}

                                                task={task}

                                                employees={employees}

                                                onDeleteTask={handleDeleteTask}

                                                onEditTask={handleEditTask}

                                            />

                                        ))

                                    }




                                    <Pagination

                                        currentPage={currentPage}

                                        totalPages={totalPages}

                                        handlePrev={handlePrev}

                                        handleNext={handleNext}

                                    />

                                </div>

                            ) : (

                                <TaskTable

                                    tasks={tasks}

                                    employees={employees}

                                    onDeleteTask={handleDeleteTask}

                                    onEditTask={handleEditTask}

                                />

                            )

                        }

                    </section>

                </div>

            </PageContainer>




            {

                addTask && (

                    <AddTask

                        employees={employees}

                        onClose={() =>

                            setAddTask(false)

                        }

                        onAddTask={handleAddTask}

                    />

                )

            }

        </>

    )

}




export default Tasks