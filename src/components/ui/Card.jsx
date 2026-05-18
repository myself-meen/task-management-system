import React from 'react';
function Card({title,count}) {
    return ( <>

    <div className="bg-white shadow-md rounded-lg p-4 w-[calc(50%-0.5rem)] md:w-[calc(25%-1rem)]  ">
        
        <h2 className="text-md font-semibold text-[#737784] uppercase">{title}</h2>
        <h1 className='text-xl font-bold text-black'>{count}</h1>
        </div>

    </> );
}

export default Card;