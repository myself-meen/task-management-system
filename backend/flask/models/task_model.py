from config.db import get_connection


def get_tasks(
    priority,
    status,
    search

):
    priority_val = priority if priority else None
    status_val = status if status else None
    search_term = search if search else None
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "CALL GetTasks(%s, %s, %s)",
        (
            priority_val,
            status_val,
            search_term
        )

    )
    tasks = cursor.fetchall()
    while cursor.nextset():
        pass
    cursor.close()
    connection.close()
    return tasks

def save_tasks(
    task_id,
    name,
    priority,
    status,
    due_date,
    employee_id

):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "CALL SaveTask(%s, %s, %s, %s, %s, %s)",
        (
            task_id,
            name,
            priority,
            status,
            due_date,
            employee_id

        )

    )

    connection.commit()
    cursor.close()
    connection.close()
    return True

def update_task(
    task_id,
    name,
    priority,
    status,
    due_date,
    employee_id

):
    connection = get_connection()
    cursor = connection.cursor()
    
    cursor.execute(

        """
        UPDATE tasks
        SET
            task_name=%s,
            task_priority=%s,
            task_status=%s,
            task_dueDate=%s,
            employee_id=%s
        WHERE task_id=%s
        """,
        (
            name,
            priority,
            status,
            due_date,
            employee_id,
            task_id
        )

    )
    connection.commit()
    cursor.close()
    connection.close()
    return True

def delete_task(task_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "DELETE FROM tasks WHERE task_id = %s",
        (task_id,)
    )
    connection.commit()
    cursor.close()
    connection.close()
    return True