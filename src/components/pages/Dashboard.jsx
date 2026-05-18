import React, { Component } from 'react';
import PageContainer from '../layout/PageContainer';

import Avatar from '../ui/Avatar';
import TaskTable from '../ui/TaskTable';
import Card from '../ui/Card';
import PageHeader from '../ui/PageHeader';
import TaskCard from '../ui/TaskCard';
import { useIsMobile } from './useIsMobile';

function Dashboard() {
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
const isMobile = useIsMobile();
    return ( <>
    
    <PageContainer>
<div className='flex flex-col gap-y-8'>
    <PageHeader head='Dashboard' subhead='Oversee statistics and most recent activity'/>
        <section className='stats flex flex-wrap md:justify-between gap-4'>
            <Card   title='Total' count={dummyTasks.length}/>
            <Card  title='Completed' count='0'/>
            <Card  title='Pending' count='0'/>
            <Card  title='Teams' count='0'/>
        </section>
        <h1 className='text-2xl font-bold text-[#434652]'>Recent Tasks</h1>
     <section className='tasks'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {dummyTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        ) : (
            <TaskTable tasks={dummyTasks}/>
        )}
    </section>
    </div>
</PageContainer>
    
    
   
  
    </> );
}

export default Dashboard;