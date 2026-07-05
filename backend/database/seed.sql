USE taskflow;

INSERT INTO organizations (organization_name)
VALUES ('Sample Organization')
ON DUPLICATE KEY UPDATE organization_name = VALUES(organization_name);

SET @org_id = LAST_INSERT_ID();

INSERT INTO departments (department_name, organization_id)
VALUES ('Engineering', @org_id), ('Design', @org_id)
ON DUPLICATE KEY UPDATE department_name = VALUES(department_name);

INSERT INTO roles (role_name, department_id)
VALUES
  ('Software Engineer', 1),
  ('Product Designer', 2)
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

INSERT INTO employees (employee_name, employee_mail, organization_id)
VALUES
  ('Alex Johnson', 'alex@example.com', @org_id),
  ('Jamie Lee', 'jamie@example.com', @org_id)
ON DUPLICATE KEY UPDATE employee_mail = VALUES(employee_mail);

INSERT INTO employee_assignments (employee_id, department_id, role_id)
VALUES
  (1, 1, 1),
  (2, 2, 2)
ON DUPLICATE KEY UPDATE department_id = VALUES(department_id);

INSERT INTO projects (project_name, organization_id)
VALUES ('Sprint Demo', @org_id)
ON DUPLICATE KEY UPDATE project_name = VALUES(project_name);

INSERT INTO sprints (start_date, end_date, project_id)
VALUES ('2026-07-01', '2026-07-15', 1)
ON DUPLICATE KEY UPDATE start_date = VALUES(start_date);

INSERT INTO tasks (task_name, task_priority, task_status, task_dueDate, employee_id, sprint_id)
VALUES
  ('Set up CI pipeline', 'high', 'pending', '2026-07-10', 1, 1),
  ('Refine onboarding screens', 'medium', 'in progress', '2026-07-12', 2, 1)
ON DUPLICATE KEY UPDATE task_status = VALUES(task_status);
