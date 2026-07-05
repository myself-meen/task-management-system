from config.db import get_connection
def get_dashboard_data():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.callproc('GetDashboardData')
    statistics = cursor.fetchall()
    cursor.nextset()
    employees = cursor.fetchall()
    cursor.nextset()
    recent_tasks = cursor.fetchall()

    while cursor.nextset():
        pass
    cursor.close()
    connection.close()
    return {
        "statistics": statistics,
        "employees": employees,
        "recent_tasks": recent_tasks

    }