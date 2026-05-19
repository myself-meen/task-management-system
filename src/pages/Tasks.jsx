import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import TaskTable from '../components/ui/Table/TaskTable';
import Search from '../components/ui/Search';
import Button from '../components/ui/Button';
import { IoFilterOutline } from "react-icons/io5";
import FilterMenuTask from '../components/ui/Filter/FilterMenuTask';
import AddTask from '../components/forms/AddTask';
import PageHeader from '../components/ui/PageHeader';
import TaskCard from '../components/ui/TaskCard';
import { useIsMobile } from '../CustomHooks/useIsMobile';
import { usePagination } from '../CustomHooks/usePagination';
import Pagination from '../components/ui/Pagination';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';

function Tasks() {
    const [addTask, setAddTask] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
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
    const handleAddTask=(newTaskData)=>{
        const newTask={
            ...newTaskData,id:Date.now()
        }
        setTasks([newTask,...tasks]);
        setAddTask(false);
    }
    const handleDeleteTask=(id)=>{
        const updatedTasks =
    tasks.filter((task) => task.id !== id);

  setTasks(updatedTasks);


    }
    const isMobile = useIsMobile();
    const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(tasks);

    return ( <>
    <PageContainer>
       
    <div className='flex flex-col gap-y-8'>
         <PageHeader head='Task Management' subhead='Oversee and track all organizational activities in real-time'/>
        {/* <section className='stats flex flex-wrap gap-4'>
            <Card   title='Total' count={dummyTasks.length}/>
            <Card  title='Pending' count='0'/>
            <Card  title='In Progress' count='0'/>
            <Card  title='Completed' count='0'/>
        </section> */}
         <section className='flex md:justify-between gap-4'>
        <Search >Search Tasks . . .</Search>
       <div className='flex gap-4'>
        <button className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex bg-white shadow-md gap-2 items-center' onClick={() => setOpenFilter(!openFilter)}><IoFilterOutline/> {isMobile?'':'Filter'}</button>
        {openFilter && <FilterMenuTask  setOpenFilter={setOpenFilter}/>}
        <button  className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex  bg-[#4271D0]
        text-white shadow-md gap-2 items-center' onClick={() => setAddTask(!addTask)}>{isMobile?'+':'Add Task'}</button>
       
        </div>
        </section>
    <section className='tasks'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {currentData.map(task => (
                    <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTask}/>
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        ) : (
            <TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} />
        )}
    </section>
    </div>
    </PageContainer>
     {addTask &&(<AddTask onClose={()=>setAddTask(false)} onAddTask={handleAddTask} />)}
    </> );
}

export default Tasks;