import React, { Component, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import EmployeeTable from '../components/ui/Table/EmployeeTable';
import Search from '../components/ui/Search';
import Button from '../components/ui/Button';
import { IoFilterOutline } from "react-icons/io5";
import AddEmployee from '../components/forms/AddEmployee';
import FilterMenuEmp from '../components/ui/Filter/FilterMenuEmp';
import EmployeeCard from '../components/ui/EmployeeCard';
import PageHeader from '../components/ui/PageHeader';
import { useIsMobile } from '../CustomHooks/useIsMobile';
import { usePagination } from '../CustomHooks/usePagination';
import Pagination from '../components/ui/Pagination';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';

function Employees() {
    const[addEmployee, setAddEmployee]=useState(false);
    const[openFilter, setOpenFilter]=useState(false);
    const [employees,setEmployees]=useLocalStorage('app_employees',[
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
        },
        {
            id: 5,
            name: "John Doe",
            email: "john.doe@example.com",
            department: "Engineering",
            role: "Frontend Developer"
        },
        {
            id: 6,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            department: "Design",
            role: "UI/UX Designer"
        },
        {
            id: 7,
            name: "Michael Johnson",
            email: "michael.j@example.com",
            department: "Management",
            role: "Project Manager"
        },
        {
            id: 8,
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            department: "Engineering",
            role: "Backend Developer"
        }
    ]);
    const isMobile = useIsMobile();
    const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(employees);
    const handleAddEmployee=(newEmployeeData)=>{
        const newEmployee={
            ...newEmployeeData,id:Date.now()
        }
        setEmployees([newEmployee,...employees]);
        setAddEmployee(false);
    }
    const handleDeleteEmployee=(id)=>{
        const updatedEmployee=employees.filter((employee)=>employee.id!==id);
        setEmployees(updatedEmployee);
    }

    return (<>
    <PageContainer>
    <div className='flex flex-col gap-y-8'>
        <PageHeader head='Employee Directory' subhead='Manage your organizations talent and departments'/>
        <section className='stats flex flex-wrap gap-4'>
            <Card   title='Total Employees' count={employees.length}/>
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
        {openFilter && <FilterMenuEmp setOpenFilter={setOpenFilter} employees={employees} />}
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
                {currentData.map(employee=>(
                    <EmployeeCard key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee}/>
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        ) : (
            <EmployeeTable employees={employees} onDeleteEmployee={handleDeleteEmployee} />
        )}

    </section>
    </div>
    </PageContainer>
    {addEmployee &&(<AddEmployee onClose={()=>setAddEmployee(false)} onAddEmployee={handleAddEmployee} />)}
    </>  );
}

export default Employees;