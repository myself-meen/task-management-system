CREATE DATABASE IF NOT EXISTS taskflow;

USE taskflow;

SOURCE tables/organizations.sql;
SOURCE tables/departments.sql;
SOURCE tables/roles.sql;
SOURCE tables/employees.sql;
SOURCE tables/employee_assignments.sql;
SOURCE tables/projects.sql;
SOURCE tables/project_members.sql;
SOURCE tables/sprints.sql;
SOURCE tables/tasks.sql;

SOURCE procedures/dashboard/GetDashboardData.sql;
SOURCE procedures/employees/get_employees.sql;
SOURCE procedures/employees/save_employee.sql;
SOURCE procedures/tasks/get_tasks.sql;
SOURCE procedures/tasks/save_task.sql;
