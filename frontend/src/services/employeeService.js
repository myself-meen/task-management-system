import { requestJson } from './api'

export const getEmployees = async (filters = {}) => {
    const queryParams = new URLSearchParams()
    if (filters.department) {
        queryParams.append('department', filters.department)
    }
    if (filters.role) {
        queryParams.append('role', filters.role)
    }
    if (filters.search) {
        queryParams.append('search', filters.search)
    }

    return requestJson(`/employees?${queryParams.toString()}`)
}

export const postEmployees = async (employeeData) => {
    return requestJson('/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
}

export const putEmployees = async (employee) => {
    const employeeData = {
        name: employee.name,
        mail: employee.email,
        department_id: employee.department_id,
        role_id: employee.role_id
    }

    return requestJson(`/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
}

export const deleteEmployees = async (employeeId) => {
    return requestJson(`/employees/${employeeId}`, {
        method: 'DELETE'
    })
}