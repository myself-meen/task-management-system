from config.db import get_connection







def get_roles(department):
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(

        """
        SELECT
            role_id,
            role_name
        FROM roles
        WHERE department_id = %s
        """,

        (department,)

    )


    roles = cursor.fetchall()
    cursor.close()
    connection.close()




    return roles