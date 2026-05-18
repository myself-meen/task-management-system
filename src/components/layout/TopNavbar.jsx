import React from 'react';
import { FiMenu } from 'react-icons/fi';

function TopNavbar({ onMenuClick }) {
  return (
    <>
      {/* This navbar is only visible on mobile to show the hamburger menu */}
      <div className='bg-white h-16 sticky top-0 flex items-center px-4 shadow-sm md:hidden z-30'>
        <button onClick={onMenuClick} className="text-2xl text-[#434652]">
          <FiMenu />
        </button>
      </div>
    </>
  );
}

export default TopNavbar;
