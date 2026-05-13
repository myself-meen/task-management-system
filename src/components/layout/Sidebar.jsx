import React, { useState } from 'react';
import logo from '../../assets/TaskFlow-logo.svg'
import { RiDashboardLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { BiTask } from "react-icons/bi";
import { MdOutlinePeople } from "react-icons/md";
function Sidebar() {
  const [isActive,setIsActive]=useState("dashboard");
  return (
   <>
   <section className='bg-[#ECEDF5] flex md:flex-col md:h-screen md:p-6 gap-y-4  md:w-64 fixed bottom-0 left-0 w-full z-50 flex-row p-1'>
    <div className='logo-section md:flex items-center gap-4 hidden' >
      <img src={logo} />
      <h1 className='text-2xl font-bold self-start text-[#4271D0]'>TaskFlow</h1>


    </div >
    <div className='md:w-full w-screen'>
<nav className='flex md:flex-col md:gap-y-4 '>
  <Link to='/' onClick={() => setIsActive("dashboard")} className={`flex flex-col md:flex-row p-2 items-center md:gap-4 md:w-full w-1/3 rounded-md md:px-4 md:pr-12 md:py-2
  ${
    isActive === "dashboard"
      ? "bg-[#4271D0] text-white"
      : "text-[#434652]"
  }`}>
<RiDashboardLine/>
 <span >Dashboard</span> </Link>
  <Link onClick={() => setIsActive("tasks")} to='/tasks'   className={`flex flex-col md:flex-row p-2 items-center md:gap-4 md:w-full w-1/3 rounded-md md:px-4 md:pr-12 md:py-2
  ${
    isActive === "tasks"
      ? "bg-[#4271D0] text-white"
      : "text-[#434652]"
  }`}><BiTask/><span>Tasks</span></Link>
  <Link  onClick={() => setIsActive("employees")} to='/employees' className={`flex flex-col md:flex-row p-2 items-center md:gap-4 md:w-full w-1/3 rounded-md md:px-4 md:pr-12 md:py-2
  ${
    isActive === "employees"
      ? "bg-[#4271D0] text-white"
      : "text-[#434652]"
  }`}><MdOutlinePeople/><span>Employees</span></Link>
</nav>
    </div>
   </section>
   </>
  );
}

export default Sidebar;
