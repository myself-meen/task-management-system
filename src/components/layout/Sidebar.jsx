import React, { useState, useEffect } from 'react';
import logo from '../../assets/TaskFlow-logo.svg'
import { RiDashboardLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { BiTask } from "react-icons/bi";
import { MdOutlinePeople } from "react-icons/md";
import { FiX } from "react-icons/fi";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [isActive, setIsActive] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setIsActive('dashboard');
    } else if (path.startsWith('/tasks')) {
      setIsActive('tasks');
    } else if (path.startsWith('/employees')) {
      setIsActive('employees');
    }
  }, [location.pathname]);

  const handleLinkClick = (linkName) => {
    setIsActive(linkName);
    if (window.innerWidth < 768) { 
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
    
      <section
        className={`bg-[#ECEDF5] flex-col h-screen p-6 gap-y-4 fixed top-0 left-0 z-50 w-full md:w-64 ${
          isSidebarOpen ? 'flex' : 'hidden'
        } md:flex`}
      >
        <div className='logo-section flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <img src={logo} alt="TaskFlow Logo" />
            <h1 className='text-2xl font-bold self-start text-[#4271D0]'>TaskFlow</h1>
          </div>
          {/* Close Button for Mobile */}
          <button className="md:hidden text-2xl text-[#434652]" onClick={() => setIsSidebarOpen(false)}>
            <FiX />
          </button>
        </div>
        <div className='w-full'>
          <nav className='flex flex-col gap-y-4'>
            <Link to='/' onClick={() => handleLinkClick("dashboard")} className={`flex flex-row p-2 items-center gap-4 w-full rounded-md px-4 pr-12 py-2
              ${isActive === "dashboard" ? "bg-[#4271D0] text-white" : "text-[#434652]"}`}>
              <RiDashboardLine />
              <span>Dashboard</span>
            </Link>
            <Link onClick={() => handleLinkClick("tasks")} to='/tasks' className={`flex flex-row p-2 items-center gap-4 w-full rounded-md px-4 pr-12 py-2
              ${isActive === "tasks" ? "bg-[#4271D0] text-white" : "text-[#434652]"}`}>
              <BiTask />
              <span>Tasks</span>
            </Link>
            <Link onClick={() => handleLinkClick("employees")} to='/employees' className={`flex flex-row p-2 items-center gap-4 w-full rounded-md px-4 pr-12 py-2
              ${isActive === "employees" ? "bg-[#4271D0] text-white" : "text-[#434652]"}`}>
              <MdOutlinePeople />
              <span>Employees</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
