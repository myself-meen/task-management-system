
import React, { useState,useEffect} from 'react'
import Modal from '../ui/Modal'
function AddEmployee({
    onClose,
    onAddEmployee
}) {

    const [errors, setErrors] = useState({})
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    useEffect(() => {
        fetchDepartments()
    }, [])
    const fetchDepartments = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:5000/v1/departments'
            )
            const data = await response.json()
            setDepartments(data)
        }
        catch(error) {
            console.log(error)
        }

    }
    const fetchRoles = async (departmentId) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/v1/roles?department=${departmentId}`

            )
            const data = await response.json()
            setRoles(data)
        }
        catch(error) {
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(
            formData.entries()
        )

        const newErrors = {}
        if (

            !data.name ||

            !data.name.trim()

        ) {

            newErrors.name =

                "Full Name is required."

        } else if (data.name.length > 255) {
            newErrors.name =
                "Full Name cannot exceed 255 characters."
        }




        if (

            !data.email ||

            !data.email.trim()

        ) {

            newErrors.email =

                "Email Address is required."

        }

        else if (

            !/\S+@\S+\.\S+/.test(data.email)

        ) {

            newErrors.email =

                "Please enter a valid email address."

        }

        if (

            data.email && data.email.length > 255

        ) {
            newErrors.email =
                "Email Address cannot exceed 255 characters."
        }
        if (

            Object.keys(newErrors).length > 0

        ) {

            setErrors(newErrors)

            return

        }

        const employeeData = {
            name: data.name,
            mail: data.email,
            organization_id: 1,
            department_id: data.department_id,
            role_id: data.role_id
        }

        console.log(employeeData)
        onAddEmployee(employeeData)
        onClose()
    }
    return (
        <>
            <Modal>
                

                <div className="bg-[#F2F3FB] border-b border-[#C3C6D4] -mt-6 -mx-6 p-4 px-6 rounded-t-lg">

                    <h1 className="text-lg font-semibold text-gray-800">

                        New Employee

                    </h1>

                    <p className="text-sm text-[#434652]">

                        Fill in the details to add a new employee into the team

                    </p>

                </div>
                <form

                    className="flex flex-col mt-4"

                    onSubmit={handleSubmit}

                >
                    {/* Form Fields */}

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#434652] mb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]"
                                    placeholder="Enter full name"

                                />
                                {

                                    errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>

                                    )

                                }

                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="email"

                                    className="block text-sm font-medium text-[#434652] mb-1"

                                >

                                    Email Address

                                </label>


                                <input

                                    type="email"

                                    id="email"

                                    name="email"

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]"

                                    placeholder="Enter email address"

                                />


                                {

                                    errors.email && (

                                        <p className="text-red-500 text-xs mt-1">

                                            {errors.email}

                                        </p>

                                    )

                                }

                            </div>

                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label

                                    htmlFor="department"

                                    className="block text-sm font-medium text-[#434652] mb-1"

                                >

                                    Department

                                </label>


                                <select

                                    name="department_id"

                                    id="department"

                                    onChange={(e) =>

                                        fetchRoles(

                                            e.target.value

                                        )

                                    }

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white"

                                >


                                    <option value="">

                                        Select Department

                                    </option>


                                    {

                                        departments.map((department) => (

                                            <option

                                                key={department.department_id}

                                                value={department.department_id}

                                            >

                                                {department.department_name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>




                            <div className="flex-1">

                                <label

                                    htmlFor="role"

                                    className="block text-sm font-medium text-[#434652] mb-1"

                                >

                                    Role

                                </label>


                                <select

                                    name="role_id"

                                    id="role"

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white"

                                >


                                    <option value="">

                                        Select Role

                                    </option>


                                    {

                                        roles.map((role) => (

                                            <option

                                                key={role.role_id}

                                                value={role.role_id}

                                            >

                                                {role.role_name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                        </div>

                    </div>




                    {/* Footer */}

                    <div className="bg-[#F2F3FB] border-t border-[#C3C6D4] -mb-6 -mx-6 mt-6 p-4 px-6 rounded-b-lg flex justify-end gap-3">


                        <button

                            onClick={onClose}

                            type="button"

                            className="px-4 py-2 border border-[#C3C6D4] bg-white text-[#434652] rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"

                        >

                            Cancel

                        </button>




                        <button

                            type="submit"

                            className="px-4 py-2 bg-[#4271D0] text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"

                        >

                            Add Employee

                        </button>

                    </div>

                </form>

            </Modal>

        </>

    )

}




export default AddEmployee