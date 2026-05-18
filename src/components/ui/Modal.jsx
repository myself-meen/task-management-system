import React from 'react';

function Modal({children}) {

    return ( <>
      {/*Backdrop*/}
      <div className="fixed inset-0 z-50 flex items-center justify-center  md:items-start  md:pt-10 md:justify-end backdrop-blur-2xl">
        
        
        <div className="bg-white rounded-lg shadow-xl max-w-sm md:max-w-md p-6 relative">
          {children}
        </div>
        
      </div>
    </> );
}

export default Modal;