import React, { useEffect, useState } from 'react'

import PageContainer from '../components/layout/PageContainer'
import Card from '../components/card/Card'
import PageHeader from '../components/ui/PageHeader'
import RecentTasksTable from '../components/table/RecentTasksTable'
import RecentTaskCard from '../components/card/RecentTaskCard'
import Pagination from '../components/ui/Pagination'

import { useIsMobile } from '../CustomHooks/useIsMobile'
import { usePagination } from '../CustomHooks/usePagination'

import { getDashboardData } from '../services/dashboardService'

function Dashboard() {

    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const [statistics, setStatistics] = useState({

        total_tasks: 0,
        completed_tasks: 0,
        pending_tasks: 0,
        total_employees: 0

    })



    useEffect(() => {

        fetchDashboard()

    }, [])



    const fetchDashboard = async () => {
        setIsLoading(true)
        setErrorMessage('')

        try {
            const data = await getDashboardData()
            const statisticsData = data.statistics?.[0]
            const employeeData = data.employees?.[0]

            if (!statisticsData || !employeeData) {
                throw new Error('Dashboard data is unavailable right now.')
            }

            setStatistics({

                total_tasks: statisticsData.total_tasks,
                completed_tasks: statisticsData.completed_tasks,
                pending_tasks: statisticsData.pending_tasks,
                total_employees: employeeData.total_employees

            })

            const formattedTasks = data.recent_tasks.map((task) => {

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

                    assignee: task.employee_name

                }

            })



            setTasks(formattedTasks)

        }

        catch(error) {
            setErrorMessage(error.message || 'Unable to load dashboard data.')
        }
        finally {
            setIsLoading(false)
        }

    }


    const isMobile = useIsMobile()



    const {

        currentPage,
        totalPages,
        currentData,
        handlePrev,
        handleNext

    } = usePagination(tasks)



    return (

        <PageContainer>

            <div className='flex flex-col gap-y-8'>

                <PageHeader

                    head='Dashboard'

                    subhead='Oversee statistics and most recent activity'

                />



                <section className='stats flex flex-wrap md:justify-between gap-4'>

                    <Card

                        title='Total Tasks'

                        count={statistics.total_tasks}

                    />



                    <Card

                        title='Completed'

                        count={statistics.completed_tasks}

                    />



                    <Card

                        title='Pending'

                        count={statistics.pending_tasks}

                    />



                    <Card

                        title='Total Employees'

                        count={statistics.total_employees}

                    />

                </section>



                <h1 className='text-2xl font-bold text-[#434652]'>

                    Recent Tasks

                </h1>



                <section className='tasks'>
                    {isLoading ? (
                        <div className='rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500'>Loading recent tasks...</div>
                    ) : errorMessage ? (
                        <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600'>{errorMessage}</div>
                    ) : (
                        isMobile ? (

                            <div className="flex flex-col gap-4">

                                {

                                    currentData.map((task) => (

                                        <RecentTaskCard

                                            key={task.id}

                                            task={task}

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

                            <RecentTasksTable

                                tasks={tasks}

                            />

                        )
                    )}

                </section>

            </div>

        </PageContainer>

    )

}

export default Dashboard