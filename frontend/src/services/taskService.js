import { requestJson } from './api'

export const getTasks = async (filters = {}) => {
    const queryParams = new URLSearchParams()
    if (filters.priority) {
        queryParams.append('priority', filters.priority)
    }
    if (filters.status) {
        queryParams.append('status', filters.status)
    }
    if (filters.search) {
        queryParams.append('search', filters.search)
    }

    return requestJson(`/tasks?${queryParams.toString()}`)
}

export const postTasks = async (task) => {
    return requestJson('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

export const putTasks = async (task) => {
    const taskData = {
        name: task.name,
        priority: task.priority,
        status: task.status,
        due_date: task.dueDate,
        employee_id: task.employee_id
    }

    return requestJson(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
}

export const deleteTasks = async (taskId) => {
    return requestJson(`/tasks/${taskId}`, {
        method: 'DELETE'
    })
}

