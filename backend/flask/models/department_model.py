from config.db import get_connection


connection = get_connection()




def get_departments():
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(

        """
        SELECT
            department_id,
            department_name
        FROM departments
        """
    )


    departments = cursor.fetchall()
    cursor.close()
    connection.close()


    return departments