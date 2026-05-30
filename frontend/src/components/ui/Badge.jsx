import React from 'react';
function Badge({ stat }) {
    let styles="none";
    if(stat=='completed'){
styles="bg-green-200 text-green-500"
    }
    else if (stat=='in progress'){
        styles="bg-blue-200 text-blue-500"
    }
    else if(stat=='pending'){
styles="bg-yellow-200 text-yellow-500"
    }
    else if(stat=='overdue'){
styles="bg-red-200 text-red-500"
    }
    else if(stat=='cancelled'){
styles="bg-gray-200 text-gray-500"
    }
    else if(stat=='high'){
styles="border border-red-500 text-red-500 bg-white"
    }
    else if(stat=='medium'){
styles="border border-yellow-500 text-yellow-500 bg-white"
    }
    else if(stat=='low'){
styles="border border-green-500 text-green-500 bg-white"
    }
    return ( <>
    <div className={`rounded-lg ${styles} px-2 py-1 text-xs font-medium w-fit`}>{stat}</div>
    </> );
}

export default Badge;