import React, { Component } from 'react';
import PageContainer from '../layout/PageContainer';
import Card from '../ui/Card';
import TaskTable from '../ui/TaskTable';
import EmployeeTable from '../ui/EmployeeTable';


function Employees() {
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

    return (<>
    <PageContainer>
    <div className='flex flex-col gap-y-8'>
        <section className='stats flex  gap-x-4 '>
            <Card   title='Total' count={dummyTasks.length}/>
            <Card  title='Pending' count='0'/>
            <Card  title='In Progress' count='0'/>
            <Card  title='Completed' count='0'/>
        </section>
    <section className='recent-tasks'>
<EmployeeTable/>
    </section>
    </div>
    </PageContainer>
    </>  );
}

export default Employees;