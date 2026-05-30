import unittest
from unittest.mock import patch
from flask import Flask
from controllers.employee_controller import (
    fetch_employees,
    post_employees,
    update_employees,
    remove_employees
)
class TestEmployeeController(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.testing = True
    @patch('controllers.employee_controller.get_employees')
    def test_fetch_employees_success(self, mock_get_employees):
        mock_get_employees.return_value = [
            {
                "employee_id": 1,
                "employee_name": "Maria"
            }
        ]

        with self.app.test_request_context(
            '/employees?department=1'
        ):
            response = fetch_employees()
            data = response.get_json()
            self.assertEqual(
                data[0]['employee_name'],
                "Maria"
            )
    @patch('controllers.employee_controller.get_employees')
    def test_fetch_employees_empty(self, mock_get_employees):
        mock_get_employees.return_value = []
        with self.app.test_request_context(
            '/employees'
        ):
            response = fetch_employees()
            data = response.get_json()
            self.assertEqual(
                data,
                []
            )


    @patch('controllers.employee_controller.get_employees')
    def test_fetch_employees_exception(self, mock_get_employees):
        mock_get_employees.side_effect = Exception()
        with self.app.test_request_context(
            '/employees'
        ):
            response = fetch_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Internal Server Error"

            )
            self.assertEqual(response.status_code, 500)

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_success(self, mock_save_employees):
        mock_save_employees.return_value = True
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": "Maria",
                "mail": "maria@gmail.com",
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1
            }

        ):

            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Employee saved successfully"
            )


    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_failure(self, mock_save_employees):
        mock_save_employees.return_value = False
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": "Maria",
                "mail": "maria@gmail.com",
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1

            }

        ):

            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Employee save failed"

            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_duplicate_exception(self, mock_save_employees):
        mock_save_employees.side_effect = Exception(
            "Duplicate entry"
        )
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": "Maria",
                "mail": "maria@gmail.com",
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1
            }

        ):
            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Employee mail already exists"

            )
            self.assertEqual(response.status_code, 409)

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_name_too_long(self, mock_save_employees):
        long_name = 'a' * 256
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": long_name,
                "mail": "maria@gmail.com",
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1
            }

        ):
            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Full Name cannot exceed 255 characters"
            )
            self.assertEqual(response.status_code, 400)
            mock_save_employees.assert_not_called()

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_email_too_long(self, mock_save_employees):
        long_email = 'a' * 246 + '@test.com'
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": "Maria",
                "mail": long_email,
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1
            }

        ):
            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Email Address cannot exceed 255 characters"
            )
            self.assertEqual(response.status_code, 400)
            mock_save_employees.assert_not_called()

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_invalid_foreign_key_exception(self, mock_save_employees):
        mock_save_employees.side_effect = Exception(
            "Cannot add or update a child row"
        )
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={
                "name": "Maria",
                "mail": "maria@gmail.com",
                "organization_id": 999,
                "department_id": 999,
                "role_id": 999
            }

        ):
            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Invalid organization, department or role id"
            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.employee_controller.save_employees')
    def test_post_employees_internal_server_error(self, mock_save_employees):
        mock_save_employees.side_effect = Exception(
            "Random Error"
        )
        with self.app.test_request_context(
            '/employees',
            method='POST',
            json={

                "name": "Maria",
                "mail": "maria@gmail.com",
                "organization_id": 1,
                "department_id": 1,
                "role_id": 1

            }

        ):
            response = post_employees()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Internal Server Error"

            )
            self.assertEqual(response.status_code, 500)
    @patch('controllers.employee_controller.update_employee')
    def test_update_employees_success(self, mock_update_employee):
        mock_update_employee.return_value = True
        with self.app.test_request_context(
            '/employees/1',
            method='PUT',
            json={
                "name": "Maria Updated",
                "mail": "updated@gmail.com",
                "department_id": 2,
                "role_id": 2
            }
        ):
            response = update_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Employee updated successfully"
            )
    @patch('controllers.employee_controller.update_employee')
    def test_update_employees_failure(self, mock_update_employee):
        mock_update_employee.return_value = False
        with self.app.test_request_context(
            '/employees/1',
            method='PUT',
            json={
                "name": "Maria Updated",
                "mail": "updated@gmail.com",
                "department_id": 2,
                "role_id": 2
            }
        ):
            response = update_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Employee update failed"

            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.employee_controller.update_employee')
    def test_update_employees_foreign_key_exception(self, mock_update_employee):
        mock_update_employee.side_effect = Exception(
            "Cannot add or update a child row"
        )
        with self.app.test_request_context(
            '/employees/1',
            method='PUT',
            json={
                "name": "Maria Updated",
                "mail": "updated@gmail.com",
                "department_id": 999,
                "role_id": 999
            }

        ):
            response = update_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Invalid department or role id"
            )
            self.assertEqual(response.status_code, 400)


    @patch('controllers.employee_controller.delete_employee')
    def test_remove_employees_success(self, mock_delete_employee):
        mock_delete_employee.return_value = True
        with self.app.test_request_context(
            '/employees/1',
            method='DELETE'

        ):
            response = remove_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Employee deleted successfully"
            )

    @patch('controllers.employee_controller.count_employee_tasks')
    @patch('controllers.employee_controller.delete_employee')
    def test_remove_employees_assigned_tasks(self, mock_delete_employee, mock_count_tasks):
        mock_count_tasks.return_value = 3
        mock_delete_employee.return_value = True
        with self.app.test_request_context(
            '/employees/1',
            method='DELETE'
        ):
            response = remove_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Employee has 3 assigned tasks and cannot be deleted until those tasks are reassigned or removed."
            )
            self.assertEqual(response.status_code, 409)
            mock_delete_employee.assert_not_called()

    @patch('controllers.employee_controller.delete_employee')
    def test_remove_employees_failure(self, mock_delete_employee):
        mock_delete_employee.return_value = False
        with self.app.test_request_context(
            '/employees/1',
            method='DELETE'
        ):

            response = remove_employees(1)
            data = response.get_json()
            self.assertEqual(

                data['error'],
                "Employee delete failed"
            )
            self.assertEqual(response.status_code, 400)
    @patch('controllers.employee_controller.delete_employee')
    def test_remove_employees_internal_server_error(self, mock_delete_employee):
        mock_delete_employee.side_effect = Exception(
            "Random Error"
        )
        with self.app.test_request_context(
            '/employees/1',
            method='DELETE'

        ):
            response = remove_employees(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Internal Server Error"
            )
            self.assertEqual(response.status_code, 500)
if __name__ == '__main__':

    unittest.main()