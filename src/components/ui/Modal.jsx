import React from 'react';

function Modal({children}) {

    return ( <>
      {/*Backdrop*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center  md:items-start  md:pt-10 md:justify-end backdrop-blur-2xl">
        
        {/*form*/}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
          {children}
        </div>
        
      </div>
    </> );
}

export default Modal;