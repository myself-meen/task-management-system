USE taskflow;

DROP PROCEDURE IF EXISTS SaveTask;

DELIMITER //

CREATE PROCEDURE SaveTask(

    IN p_task_id INT,

    IN p_name VARCHAR(255),



    IN p_priority VARCHAR(255),

    IN p_status VARCHAR(255),

    IN p_due_date DATE,

    IN p_employee_id INT

)

BEGIN



    IF p_task_id IS NULL THEN

        INSERT INTO tasks (

            task_name,
        
            task_priority,
            task_status,
            task_dueDate,
            employee_id

        )

        VALUES (

            p_name,

            p_priority,
            p_status,
            p_due_date,
            p_employee_id

        );



    

    ELSE

        UPDATE tasks

        SET

            task_name = p_name,
        
            task_priority = p_priority,
            task_status = p_status,
            task_dueDate = p_due_date,
            employee_id = p_employee_id

        WHERE task_id = p_task_id;

    END IF;

END //

DELIMITER ;
