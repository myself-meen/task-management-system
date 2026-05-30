USE taskflow;

DROP PROCEDURE IF EXISTS SaveEmployee;

DELIMITER //

CREATE PROCEDURE SaveEmployee(

    IN p_employee_id INT,

    IN p_name VARCHAR(255),

    IN p_mail VARCHAR(255),

    IN p_organization_id INT,

    IN p_department_id INT,

    IN p_role_id INT

)

BEGIN

    DECLARE v_employee_id INT;



    IF p_employee_id IS NULL THEN

        INSERT INTO employees (

            employee_name,
            employee_mail,
            organization_id

        )

        VALUES (

            p_name,
            p_mail,
            p_organization_id

        );

        SET v_employee_id = LAST_INSERT_ID();

        INSERT INTO employee_assignments (

            employee_id,
            department_id,
            role_id

        )

        VALUES (

            v_employee_id,
            p_department_id,
            p_role_id

        );



    

    ELSE

        UPDATE employees

        SET

            employee_name = p_name,
            employee_mail = p_mail

        WHERE employee_id = p_employee_id;

        UPDATE employee_assignments

        SET

            department_id = p_department_id,
            role_id = p_role_id

        WHERE employee_id = p_employee_id;

    END IF;

END //

DELIMITER ;
