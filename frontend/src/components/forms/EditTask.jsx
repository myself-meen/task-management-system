import React, { useState } from 'react'
import Modal from '../ui/Modal'
function EditTask({
    task = {},
    employees = [],
    onClose,
    onEditTask

}) {

    const [errors, setErrors] = useState({})
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

                "Task Name is required."

        } else if (data.name.length > 255) {
            newErrors.name =
                "Task Name cannot exceed 255 characters."
        }




        if (!data.dueDate) {

            newErrors.dueDate =

                "Due Date is required."

        }




        if (!data.assignee) {

            newErrors.assignee =

                "Please select an assignee."

        }




        if (

            Object.keys(newErrors).length > 0

        ) {

            setErrors(newErrors)

            return

        }
        const updatedTask = {
            id: task.id,
            name: data.name,
            priority: data.priority,
            status: data.status,
            dueDate: data.dueDate,
            employee_id: data.assignee
        }
        onEditTask(updatedTask)
        onClose()
    }

    return (
        <>
            <Modal>
                <div className="bg-[#F2F3FB] border-b border-[#C3C6D4] -mt-6 -mx-6 p-4 px-6 rounded-t-lg">
                    <h1 className="text-lg font-semibold text-gray-800">
                        Edit Task
                    </h1>
                    <p className="text-sm text-[#434652]">
                        Update the details for this task
                    </p>
                </div>
                <form
                    className="flex flex-col mt-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <label
                                htmlFor="taskName"

                                className="block text-sm font-medium text-[#434652] mb-1"

                            >

                                Task Name

                            </label>


                            <input

                                type="text"

                                id="taskName"

                                name="name"

                                defaultValue={task.name}

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




                        <div>

                            <label

                                htmlFor="priority"

                                className="block text-sm font-medium text-[#434652] mb-1"

                            >

                                Priority

                            </label>


                            <select

                                id="priority"

                                name="priority"

                                defaultValue={task.priority}

                                className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white"

                            >

                                <option value="low">

                                    Low

                                </option>

                                <option value="medium">

                                    Medium

                                </option>

                                <option value="high">

                                    High

                                </option>

                            </select>

                        </div>




                        <div className="flex gap-4">


                            <div className="flex-1">

                                <label

                                    htmlFor='status'

                                    className="block text-sm font-medium text-[#434652] mb-1"

                                >

                                    Status

                                </label>


                                <select

                                    id="status"

                                    name="status"

                                    defaultValue={task.status}

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white"

                                >

                                    <option value="pending">

                                        Pending

                                    </option>

                                    <option value="in progress">

                                        In Progress

                                    </option>

                                    <option value="completed">

                                        Completed

                                    </option>

                                </select>

                            </div>




                            <div className="flex-1">

                                <label

                                    htmlFor="dueDate"

                                    className="block text-sm font-medium text-[#434652] mb-1"

                                >

                                    Due Date

                                </label>


                                <input

                                    type="date"

                                    id="dueDate"

                                    name="dueDate"

                                    defaultValue={task.dueDate}

                                    className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0]"

                                />


                                {

                                    errors.dueDate && (

                                        <p className="text-red-500 text-xs mt-1">

                                            {errors.dueDate}

                                        </p>

                                    )

                                }

                            </div>

                        </div>




                        <div>

                            <label

                                htmlFor="assignee"

                                className="block text-sm font-medium text-[#434652] mb-1"

                            >

                                Assignee

                            </label>


                            <select

                                id="assignee"

                                name="assignee"

                                defaultValue={task.employee_id}

                                className="w-full border border-[#C3C6D4] rounded-md p-2 text-sm focus:outline-none focus:border-[#4271D0] bg-white"

                            >

                                <option value="">

                                    Select assignee

                                </option>


                                {

                                    employees.map((employee) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.name}
                                        </option>
                                    ))
                                }
                            </select>
                            {
                                errors.assignee && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.assignee}
                                    </p>
                                )
                            }
                        </div>
                    </div>
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
export default EditTask