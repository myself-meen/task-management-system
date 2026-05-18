import React, { Component, useState } from 'react';
import PageContainer from '../layout/PageContainer';
import Card from '../ui/Card';
import TaskTable from '../ui/TaskTable';
import EmployeeTable from '../ui/EmployeeTable';
import Search from '../ui/Search';
import Button from '../ui/Button';
import { IoFilterOutline } from "react-icons/io5";
import AddEmployee from '../forms/AddEmployee';
import FilterMenuEmp from '../ui/FilterSort/FilterMenuEmp';
import EmployeeCard from '../ui/EmployeeCard';
import PageHeader from '../ui/PageHeader';
import { useIsMobile } from './useIsMobile';
function Employees() {
    const[addEmployee, setAddEmployee]=useState(false);
    const[openFilter, setOpenFilter]=useState(false);
    const dummyEmployees = [
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
        },
        {
            id: 3,
            name: "Michael Johnson",
            email: "michael.j@example.com",
            department: "Management",
            role: "Project Manager"
        },
        {
            id: 4,
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            department: "Engineering",
            role: "Backend Developer"
        }
    ];
    const isMobile = useIsMobile();

    return (<>
    <PageContainer>
    <div className='flex flex-col gap-y-8'>
        <PageHeader head='Employee Directory' subhead='Manage your organizations talent and departments'/>
        <section className='stats flex flex-wrap gap-4'>
            <Card   title='Total Employees' count={dummyEmployees.length}/>
            <Card  title='Departments' count='0'/>
            <Card  title='Roles' count='0'/>
            
        </section>
        <section className='flex md:justify-between gap-4'>
        <Search>
          
            Search Employees . . .
        </Search>
       <div className='flex gap-4'>
        <button className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex bg-white shadow-md gap-2 items-center' onClick={() => setOpenFilter(!openFilter)}><IoFilterOutline/> {isMobile?'':'Filter'}</button>
        {openFilter && <FilterMenuEmp setOpenFilter={setOpenFilter} employees={dummyEmployees} />}
        <button  className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex  bg-[#4271D0]
        text-white shadow-md gap-2 items-center' onClick={() => setAddEmployee(!addEmployee)} >{isMobile?'+':'Add Employee'}</button>
        </div>
        </section>
    <section className='employees'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {dummyEmployees.map(employee=>(
                    <EmployeeCard key={employee.id} employee={employee}/>
                ))}
                </div>):(
<EmployeeTable employees={dummyEmployees}/>
            )}

    </section>
    </div>
    </PageContainer>
    {addEmployee &&(<AddEmployee onClose={()=>setAddEmployee(false)} />)}
    </>  );
}

export default Employees;