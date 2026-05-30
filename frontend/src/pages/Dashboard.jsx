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
import { useEffect } from 'react';
import { getTasks } from '../services/taskService';
import { getEmployees } from '../services/employeeService';

function Dashboard() {
       const [tasks, setTasks] = useState([]);
       const [employees, setEmployees] = useState([]);
           useEffect(()=>{
               fetchTasks();
               fetchEmployees();
           },[])
           const fetchTasks=async()=>{
               try{
                   const data = await getTasks()
                   const formattedTasks=data.map((task)=>{
                       return{
                           id:task.task_id,
                           name:task.task_name,
                           priority:task.task_priority,
                           status:task.task_status,
                            dueDate: task.task_dueDate
    ? new Date(task.task_dueDate)
        .toISOString()
        .split('T')[0]
    : '',
                           assignee:task.employee_name
                       }
                   })
                   setTasks(formattedTasks);
               }
               catch(error){
       console.log(error)
               }
           }

           const fetchEmployees = async () => {
               try {
                   const data = await getEmployees();
                   setEmployees(data);
               } catch (error) {
                   console.log(error);
               }
           };

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
        const completedCount = tasks.filter(task => String(task.status || '').trim().toLowerCase() === 'completed').length;
        const pendingCount = tasks.filter(task => String(task.status || '').trim().toLowerCase() === 'pending').length;
        const employeeCount = employees.length;
        const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(tasks);



    return ( <>
    
    <PageContainer>
<div className='flex flex-col gap-y-8'>
    <PageHeader head='Dashboard' subhead='Oversee statistics and most recent activity'/>
        <section className='stats flex flex-wrap md:justify-between gap-4'>
            <Card   title='Total' count={tasks.length}/>
            <Card  title='Completed' count={completedCount}/>
            <Card  title='Pending' count={pendingCount}/>
            <Card  title='Employees' count={employeeCount}/>
        </section>
        <h1 className='text-2xl font-bold text-[#434652]'>Recent Tasks</h1>
<section className='tasks'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {currentData.map(task => (
                    <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask}  />
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