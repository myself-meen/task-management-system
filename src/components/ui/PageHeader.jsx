import React from 'react';
function PageHeader({head, subhead}) {
    return ( <>
    <div>
    <h1 className='text-3xl font-bold text-[#434652]'>{head}</h1>
    <p className='text-md text-[#434652] mt-2'>{subhead}</p>
    </div>

    </> );
}

export default PageHeader;