from config.db import get_connection

def get_employees(
    department,
    role,
    search
):
    dept_id = department if department else None
    role_id = role if role else None
    search_term = search if search else None
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "CALL GetEmployees(%s, %s, %s)",
        (
            dept_id,
            role_id,
            search_term
        )

    )
    employees = cursor.fetchall()
    while cursor.nextset():
        pass
    cursor.close()
    connection.close()
    return employees

def save_employees(
    employee_id,
    name,
    mail,
    organization_id,
    department_id,
    role_id

):  
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "CALL SaveEmployee(%s,%s,%s,%s,%s,%s)",
        (
            employee_id,
            name,
            mail,
            organization_id,
            department_id,
            role_id

        )

    )
    connection.commit()
    cursor.close()
    connection.close()
    return True

def update_employee(
    employee_id,
    name,
    mail,
    department_id,
    role_id
):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "CALL SaveEmployee(%s, %s, %s, %s, %s, %s)",
        (
            employee_id,
            name,
            mail,
            None,
            department_id,
            role_id
        )

    )
    connection.commit()
    cursor.close()
    connection.close()
    return True

def count_employee_tasks(employee_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT COUNT(*) AS count FROM tasks WHERE employee_id = %s",
        (employee_id,)
    )
    row = cursor.fetchone()
    cursor.close()
    connection.close()
    return row['count'] if row else 0


def delete_employee(employee_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "DELETE FROM employees WHERE employee_id = %s",
        (employee_id,)

    )
    connection.commit()
    cursor.close()
    
    return True