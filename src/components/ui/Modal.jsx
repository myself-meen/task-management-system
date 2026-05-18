import React from 'react';

function Modal({children}) {

    return ( <>
      {/* 1. The Backdrop (dims the background and covers the whole screen) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center  md:items-start  md:pt-10 md:justify-end bg-gray-50 bg-opacity-5">
        
        {/* 2. The Modal Box (holds the actual form) */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
          {children}
        </div>
        
      </div>
    </> );
}

export default Modal;