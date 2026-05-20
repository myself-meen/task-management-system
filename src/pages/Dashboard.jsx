import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';

import Card from '../components/card/Card';
import PageHeader from '../components/ui/PageHeader';
import TaskCard from '../components/card/TaskCard';
import TaskTable from '../components/Table/TaskTable';
import { useIsMobile } from '../CustomHooks/useIsMobile';
import { usePagination } from '../CustomHooks/usePagination';
import Pagination from '../components/ui/Pagination';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';
import AddTask from '../components/forms/AddTask';
import RecentTasksTable from '../components/Table/RecentTasksTable';

function Dashboard() {

    
        const [tasks, setTasks] = useLocalStorage('app_tasks', [
            {
                id: 1,
                name: "Design Homepage UI",
                priority: "high",
                status: "in progress",
                dueDate: "2023-10-31",
                assignee: "John Doe"
            },
            {
                id: 2,
                name: "Setup Backend Database",
                priority: "high",
                status: "pending",
                dueDate: "2023-11-05",
                assignee: "Jane Smith"
            },
            {
                id: 3,
                name: "Update Documentation",
                priority: "low",
                status: "completed",
                dueDate: "2023-10-20",
                assignee: "John Doe"
            },
            {
                id: 4,
                name: "Design Homepage UI",
                priority: "high",
                status: "in progress",
                dueDate: "2023-10-31",
                assignee: "John Doe"
            },
            {
                id: 5,
                name: "Setup Backend Database",
                priority: "high",
                status: "pending",
                dueDate: "2023-11-05",
                assignee: "Jane Smith"
            },
            {
                id: 6,
                name: "Update Documentation",
                priority: "low",
                status: "completed",
                dueDate: "2023-10-20",
                assignee: "John Doe"
            }
        ]);
      
        const [employees] = useLocalStorage('app_employees', [
            {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                department: "Engineering",
                role: "Frontend Developer"
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                department: "Design",
                role: "UI/UX Designer"
            }
        ]);

        const handleDeleteTask = (id) => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
        };

        const handleEditTask = (id, updatedTaskData) => {
            const updatedTasks = tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, ...updatedTaskData };
                }
                return task;
            });
            setTasks(updatedTasks);
        };
       
        const isMobile = useIsMobile();
        const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(tasks);



    return ( <>
    
    <PageContainer>
<div className='flex flex-col gap-y-8'>
    <PageHeader head='Dashboard' subhead='Oversee statistics and most recent activity'/>
        <section className='stats flex flex-wrap md:justify-between gap-4'>
            <Card   title='Total' count={tasks.length}/>
            <Card  title='Completed' count='0'/>
            <Card  title='Pending' count='0'/>
            <Card  title='Teams' count='0'/>
        </section>
        <h1 className='text-2xl font-bold text-[#434652]'>Recent Tasks</h1>
<section className='tasks'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {currentData.map(task => (
                    <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} employees={employees} />
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        ) : (
            <RecentTasksTable tasks={tasks}  />
        )}
    </section>
    </div>
    </PageContainer>
     
    </> );
}

export default Dashboard;