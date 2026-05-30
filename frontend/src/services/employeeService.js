const BASE_URL = 'http://127.0.0.1:5000/v1'
export const getEmployees = async (
    filters = {}
) => {
    const queryParams = new URLSearchParams()
    if (filters.department) {
        queryParams.append(
            'department',
            filters.department
        )

    }
    if (filters.role) {
        queryParams.append(
            'role',
            filters.role
        )

    }
    if (filters.search) {
        queryParams.append(
            'search',
            filters.search
        )

    }
    const response = await fetch(
        `${BASE_URL}/employees?${queryParams.toString()}`
    )
    const data = await response.json()
    return data

}
export const postEmployees = async (employeeData) => {
    const response = await fetch(
        `${BASE_URL}/employees`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        }
    )
    const data = await response.json()
    return data
}
export const putEmployees = async (employee) => {
    const employeeData = {
        name: employee.name,
        mail: employee.email,
        department_id: employee.department_id,
        role_id: employee.role_id
    }
    const response = await fetch(
        `${BASE_URL}/employees/${employee.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        }

    )
    const data = await response.json()
    return data
}
export const deleteEmployees = async (employeeId) => {
    const response = await fetch(
        `${BASE_URL}/employees/${employeeId}`,
        {
            method: 'DELETE'
        }

    )

    const data = await response.json()
    return data
}