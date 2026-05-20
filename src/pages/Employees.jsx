import React, { Component, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/card/Card';
import EmployeeTable from '../components/Table/EmployeeTable';
import Search from '../components/ui/Search';
import Button from '../components/ui/Button';
import { IoFilterOutline } from "react-icons/io5";
import AddEmployee from '../components/forms/AddEmployee';
import FilterMenuEmp from '../components/filter/FilterMenuEmp';
import EmployeeCard from '../components/card/EmployeeCard';
import PageHeader from '../components/ui/PageHeader';
import { useIsMobile } from '../CustomHooks/useIsMobile';
import { usePagination } from '../CustomHooks/usePagination';
import Pagination from '../components/ui/Pagination';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';

function Employees() {
    const[addEmployee, setAddEmployee]=useState(false);
    const[openFilter, setOpenFilter]=useState(false);
    const[filter,setFilter]=useState('All');
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
    const FilteredEmployees=employees.filter((employee)=>{
        if(filter==='All') return true;
        return employee.department===filter||employee.role===filter;
    })
    const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(FilteredEmployees);
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

    const handleEditEmployee = (id, updatedData) => {
        const updatedEmployees = employees.map((emp) => {
            if (emp.id === id) {
                return { ...emp, ...updatedData };
            }
            return emp;
        });
        setEmployees(updatedEmployees);
    };

    return (<>
    <PageContainer>
    <div className='flex flex-col gap-y-8'>
        <PageHeader head='Employee Directory' subhead='Manage your organizations talent and departments'/>
        {/* <section className='stats flex flex-wrap gap-4'>
            <Card   title='Total Employees' count={employees.length}/>
            <Card  title='Departments' count='0'/>
            <Card  title='Roles' count='0'/>
            
        </section> */}
        <section className='flex md:justify-between gap-4'>
        <Search>
          
            Search Employees . . .
        </Search>
       <div className='flex gap-4'>
        <div className='flex'>
              {filter !== 'All' ? (
                <button
                    className='text-gray-500 text-sm mr-2'
                    onClick={() => setFilter('All')}
                >
                    x Clear
                </button>
            ) : null}
        <button className='px-4 py-2  rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95 flex bg-white shadow-md gap-2 items-center' onClick={() => setOpenFilter(!openFilter)}><IoFilterOutline/> {isMobile?'':'Filter'}</button>
        {openFilter && <FilterMenuEmp setOpenFilter={setOpenFilter} setFilter={setFilter} employees={employees} />}</div>
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
                    <EmployeeCard key={employee.id} employee={employee} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleEditEmployee} />
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        ) : (
            <EmployeeTable employees={FilteredEmployees} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleEditEmployee} />
        )}

    </section>
    </div>
    </PageContainer>
    {addEmployee &&(<AddEmployee onClose={()=>setAddEmployee(false)} onAddEmployee={handleAddEmployee} />)}
    </>  );
}

export default Employees;