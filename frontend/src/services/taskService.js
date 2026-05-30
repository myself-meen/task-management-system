const BASE_URL = 'http://127.0.0.1:5000/v1'
export const getTasks = async (
    filters = {}
) => {
    const queryParams = new URLSearchParams()
    if (filters.priority) {
        queryParams.append(
            'priority',
            filters.priority
        )
    }
    if (filters.status) {

        queryParams.append(
            'status',
            filters.status
        )
    }
    if (filters.search) {

        queryParams.append(

            'search',

            filters.search

        )

    }


    const response = await fetch(

        `${BASE_URL}/tasks?${queryParams.toString()}`

    )
    return await response.json()

}

export const postTasks = async (task) =>{
    const response = await fetch(
        `${BASE_URL}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }

    )

    const data = await response.json()

    return data

}
export const putTasks = async (task) => {
    const taskData = {

        name: task.name,

        priority: task.priority,

        status: task.status,

        due_date: task.dueDate,

        employee_id: task.employee_id

    }
    const response = await fetch(

        `${BASE_URL}/tasks/${task.id}`,

        {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify(taskData)

        }

    )
    return await response.json()

}

export const deleteTasks = async (taskId) => {
    const response = await fetch(
        `${BASE_URL}/tasks/${taskId}`,
        {
            method: 'DELETE'
        }

    )

    const data = await response.json()
    return data
}


