USE taskflow;

DROP PROCEDURE IF EXISTS GetEmployees;

DELIMITER //

CREATE PROCEDURE GetEmployees(

    IN p_department_id INT,
    IN p_role_id INT,
    IN p_search VARCHAR(255)

)

BEGIN

    SELECT

        e.employee_id,
        e.employee_name,
        e.employee_mail,
        d.department_name,
        r.role_name,
        ea.role_id,
        ea.department_id


    FROM employees e

    JOIN employee_assignments ea
    ON e.employee_id = ea.employee_id

    JOIN departments d
    ON ea.department_id = d.department_id

    JOIN roles r
    ON ea.role_id = r.role_id

    WHERE

        (

            p_department_id IS NULL
            OR ea.department_id = p_department_id

        )

    AND

        (

            p_role_id IS NULL
            OR ea.role_id = p_role_id

        )

    AND

        (

            p_search IS NULL
            OR e.employee_name LIKE CONCAT('%', p_search, '%')

        );

END //

DELIMITER ;