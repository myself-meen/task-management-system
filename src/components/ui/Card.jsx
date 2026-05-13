import React from 'react';
function Card({title,count}) {
    return ( <>

    <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-md font-semibold text-[#737784]">{title}</h2>
        <h1 className='text-xl font-bold text-black'>{count}</h1>
        </div>

    </> );
}

export default Card;