USE taskflow;

DROP PROCEDURE IF EXISTS GetTasks;

DELIMITER //

CREATE PROCEDURE GetTasks(

    IN p_priority VARCHAR(255),
    IN p_status VARCHAR(255),
    IN p_search VARCHAR(255)

)

BEGIN

    SELECT

        t.task_id,
        t.task_name,
        t.task_priority,
        t.task_status,
        t.task_dueDate,
        e.employee_id,
        e.employee_name

    FROM tasks t

    JOIN employees e
    ON t.employee_id = e.employee_id

    WHERE

        (

            p_priority IS NULL
            OR t.task_priority = p_priority

        )

    AND

        (

            p_status IS NULL
            OR t.task_status = p_status

        )

    AND

        (

            p_search IS NULL
            OR t.task_name LIKE CONCAT('%', p_search, '%')

        );

END //

DELIMITER ;
