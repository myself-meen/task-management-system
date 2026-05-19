import React, { useState } from 'react';
import Modal from '../ui/Modal';

function EditEmployee({ employee = {}, onClose }) {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        const newErrors = {};
        
        if (!data.name || !data.name.trim()) {
            newErrors.name = "Full Name is required.";
        }
        
        if (!data.email || !data.email.trim()) {
            newErrors.email = "Email Address is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; 
        }

        console.log("PUT/PATCH Edit Employee:", data);
        // Connect to backend API to update data
    };

    return ( <>
    <Modal>
    {/* Header Section */}
    <div className="bg-[#F2F3FB] border-b border-[#C3C6D4] -mt-6 -mx-6 p-4 px-6 rounded-t-lg">
        <h1 className="text-lg font-semibold text-gray-800">Edit Employee</h1>
        <p className="text-sm text-[#434652]">Update the details for this employee</p>
    </div>
    
    <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        {/* Form Fields Section */}
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="name" className="block text-sm font-medium text-[#434652] mb-1">Full Name</label>
                    <input type="text" id="name" name="name" defaultValue={employee.name} className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]" placeholder="Enter full name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="flex-1">
                    <label htmlFor="email" className="block text-sm font-medium text-[#434652] mb-1">Email Address</label>
                    <input type="email" id="email" name="email" defaultValue={employee.email} className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]" placeholder="Enter email address" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
            </div>
            
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="department" className="block text-sm font-medium text-[#434652] mb-1">Department</label>
                    <select name="department" id="department" defaultValue={employee.department || "it"} className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white">
                        <option value="it">IT</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="role" className="block text-sm font-medium text-[#434652] mb-1">Role</label>
                    <select name="role" id="role" defaultValue={employee.role || "developer"} className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white">
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
            </div>
        </div>
        
        {/* Footer Section */}
        <div className="bg-[#F2F3FB] border-t border-[#C3C6D4] -mb-6 -mx-6 mt-6 p-4 px-6 rounded-b-lg flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-[#C3C6D4] bg-white text-[#434652] rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#4271D0] text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">Save Changes</button>
        </div>
    </form>
    </Modal>
    </> );
}

export default EditEmployee;