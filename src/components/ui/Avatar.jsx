import React from 'react';
function Avatar({ employee_name = "" }) {

    const nameParts = employee_name.split(" ");
    
    const a = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : "";
    
    const b = nameParts.length > 1 && nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : "";

    return (<>
    <div className="bg-[#4271D0] w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
<p>{a}{b}</p>
    </div>
    </>  );
}

export default Avatar;