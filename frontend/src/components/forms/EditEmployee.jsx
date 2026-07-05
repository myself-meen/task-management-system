import React, { useEffect,useState} from 'react'
import Modal from '../ui/Modal'
import { requestJson } from '../../services/api'
function EditEmployee({
    employee = {},
    departments = [],
    onClose,
    onEditEmployee

}) {

    const [errors, setErrors] = useState({})
    const [roles, setRoles] = useState([])
    const [formData, setFormData] = useState({
        name: employee.name || '',
        email: employee.email || '',
        department_id: employee.department_id || '',
        role_id: employee.role_id || ''
    })

    useEffect(() => {
        setFormData({
            name: employee.name || '',
            email: employee.email || '',
            department_id: employee.department_id || '',
            role_id: employee.role_id || ''
        })
        if (employee.department_id) {
            fetchRoles(employee.department_id)
        } else {
            setRoles([])
        }
    }, [employee])

    const fetchRoles = async (departmentId) => {
        try {
            const data = await requestJson(`/roles?department=${departmentId}`)
            setRoles(data)
        }
        catch(error) {
            setErrors((prev) => ({ ...prev, form: error.message || 'Unable to load roles.' }))
        }

    }

    const handleChange = async (e) => {
        const {
            name,
            value
        } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
        if (name === 'department_id') {
            setFormData((prev) => ({
                ...prev,
                department_id: value,
                role_id: ''
            }))
            fetchRoles(value)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}
        if (
            !formData.name ||
            !formData.name.trim()
        ) {
            newErrors.name =
                "Full Name is required."
        } else if (formData.name.length > 255) {
            newErrors.name =
                "Full Name cannot exceed 255 characters."
        }
        if (
            !formData.email ||

            !formData.email.trim()

        ) {

            newErrors.email =

                "Email Address is required."

        } else if (

            !/\S+@\S+\.\S+/.test(formData.email)

        ) {

            newErrors.email =

                "Please enter a valid email address."

        } else if (formData.email.length > 255) {
            newErrors.email =
                "Email Address cannot exceed 255 characters."
        }

        if (!formData.department_id) {
            newErrors.department_id = "Department is required."
        }

        if (!formData.role_id) {
            newErrors.role_id = "Role is required."
        }

        if (

            Object.keys(newErrors).length > 0

        ) {

            setErrors(newErrors)

            return

        }
        const updatedEmployee = {

            id: employee.id,

            name: formData.name,

            email: formData.email,

            department_id: formData.department_id,

            role_id: formData.role_id

        }
        onEditEmployee(updatedEmployee)

        onClose()

    }
    return (
        <>
            <Modal>
                {/* Header */}
                <div className="bg-[#F2F3FB] border-b border-[#C3C6D4] -mt-6 -mx-6 p-4 px-6 rounded-t-lg">
                    <h1 className="text-lg font-semibold text-gray-800">
                        Edit Employee
                    </h1>

                    <p className="text-sm text-[#434652]">

                        Update the details for this employee

                    </p>

                </div>
                <form className="flex flex-col mt-4"
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">


                        {/* NAME + EMAIL */}

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#434652] mb-1">
                                    Full Name
                                </label>




                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}

                                    onChange={handleChange}

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]"

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
                                <label className="block text-sm font-medium text-[#434652] mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]" />

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


                                <label className="block text-sm font-medium text-[#434652] mb-1">

                                    Department

                                </label>
                                <select

                                    name="department_id"

                                    value={formData.department_id}

                                    onChange={handleChange}

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

                                {
                                    errors.department_id && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.department_id}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="flex-1">

                                <label className="block text-sm font-medium text-[#434652] mb-1">

                                    Role

                                </label>
                                <select
                                    name="role_id"

                                    value={formData.role_id}

                                    onChange={handleChange}

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

                                {
                                    errors.role_id && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.role_id}
                                        </p>
                                    )
                                }

                            </div>

                        </div>

                    </div>




                    {/* FOOTER */}

                    <div className="bg-[#F2F3FB] border-t border-[#C3C6D4] -mb-6 -mx-6 mt-6 p-4 px-6 rounded-b-lg flex justify-end gap-3">


                        <button

                            type="button"

                            onClick={onClose}

                            className="px-4 py-2 border border-[#C3C6D4] bg-white text-[#434652] rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"

                        >

                            Cancel

                        </button>




                        <button

                            type="submit"

                            className="px-4 py-2 bg-[#4271D0] text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </Modal>

        </>

    )

}




export default EditEmployee