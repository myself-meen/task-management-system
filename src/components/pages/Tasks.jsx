import React, { useState } from 'react';
import PageContainer from '../layout/PageContainer';
import Card from '../ui/Card';
import TaskTable from '../ui/TaskTable';
import Search from '../ui/Search';
import Button from '../ui/Button';
import { IoFilterOutline } from "react-icons/io5";
import FilterMenuTask from '../ui/FilterSort/FilterMenuTask';
import AddTask from '../forms/AddTask'
import PageHeader from '../ui/PageHeader';
function Tasks() {
    const[addTask,setAddTask]=useState(false)
    const[openFilter,setOpenFilter]=useState(false);
    const dummyTasks = [
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
        }
    ];

    return ( <>
    <PageContainer>
       
    <div className='flex flex-col gap-y-8'>
         <PageHeader head='Task Management' subhead='Oversee and track all organizational activities in real-time'/>
        <section className='stats flex  gap-x-4 '>
            <Card   title='Total' count={dummyTasks.length}/>
            <Card  title='Pending' count='0'/>
            <Card  title='In Progress' count='0'/>
            <Card  title='Completed' count='0'/>
        </section>
         <section className='flex justify-between'>
        <Search >Search Tasks . . .</Search>
       <div className='flex gap-4'>
        <button className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex bg-white shadow-md gap-2 items-center' onClick={() => setOpenFilter(!openFilter)}><IoFilterOutline/> Filter</button>
        {openFilter && <FilterMenuTask setOpenFilter={setOpenFilter}/>}
        <button  className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex  bg-[#4271D0]
        text-white shadow-md gap-2 items-center' onClick={() => setAddTask(!addTask)}>Add Task</button>
       
        </div>
        </section>
    <section className='recent-tasks'>
<TaskTable tasks={dummyTasks}/>
    </section>
    </div>
    </PageContainer>
     {addTask &&(<AddTask onClose={()=>setAddTask(false)} />)}
    </> );
}

export default Tasks;