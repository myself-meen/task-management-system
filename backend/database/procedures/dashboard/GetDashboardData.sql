DROP PROCEDURE IF EXISTS GetDashboardData;
DELIMITER //
CREATE PROCEDURE GetDashboardData()
BEGIN
    SELECT 
        COUNT(*) AS total_tasks,
        SUM(
            CASE 
                WHEN LOWER(task_status) = 'completed'
                THEN 1
                ELSE 0
            END
        ) AS completed_tasks,

        SUM(
            CASE 
                WHEN LOWER(task_status) = 'pending'
                THEN 1
                ELSE 0
            END
        ) AS pending_tasks

    FROM tasks;



    SELECT 
        COUNT(*) AS total_employees
    FROM employees;



    SELECT

        t.task_id,
        t.task_name,
        t.task_priority,
        t.task_status,
        t.task_dueDate,
        e.employee_name

    FROM tasks t

    LEFT JOIN employees e
    ON t.employee_id = e.employee_id

    ORDER BY t.task_dueDate ASC

    LIMIT 5;

END //

DELIMITER ;