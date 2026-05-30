import unittest
from unittest.mock import patch
from flask import Flask
from controllers.task_controller import (
    fetch_tasks,
    post_tasks,
    update_tasks,
    remove_tasks

)

class TestTaskController(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.testing = True
    @patch('controllers.task_controller.get_tasks')
    def test_fetch_tasks_success(self, mock_get_tasks):
        mock_get_tasks.return_value = [
            {
                "task_id": 1,
                "task_name": "API Testing"
            }
        ]
        with self.app.test_request_context(
            '/tasks?priority=high'
        ):
            response = fetch_tasks()
            data = response.get_json()
            self.assertEqual(
                data[0]['task_name'],
                "API Testing"
            )
    @patch('controllers.task_controller.get_tasks')
    def test_fetch_tasks_empty(self, mock_get_tasks):
        mock_get_tasks.return_value = []
        with self.app.test_request_context(
            '/tasks'
        ):
            response = fetch_tasks()
            data = response.get_json()
            self.assertEqual(
                data,
                []
            )
    @patch('controllers.task_controller.get_tasks')
    def test_fetch_tasks_exception(self, mock_get_tasks):
        mock_get_tasks.side_effect = Exception()
        with self.app.test_request_context(
            '/tasks'
        ):
            response = fetch_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Internal Server Error"
            )
            self.assertEqual(response.status_code, 500)
    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_success(self, mock_save_tasks):
        mock_save_tasks.return_value = True
        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={
                "name": "Backend API",
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 1
            }

        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Task saved successfully"
            )
    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_failure(self, mock_save_tasks):
        mock_save_tasks.return_value = False
        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={
                "name": "Backend API",
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 1
            }

        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Task save failed"
            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_duplicate_entry_exception(self, mock_save_tasks):
        mock_save_tasks.side_effect = Exception(
            "Duplicate entry"
        )

        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={
                "name": "Backend API",
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 1
            }

        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Duplicate task entry"
            )
            self.assertEqual(response.status_code, 409)

    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_name_too_long(self, mock_save_tasks):
        long_name = 'a' * 256
        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={
                "name": long_name,
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 1
            }
        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Task name cannot exceed 255 characters"
            )
            self.assertEqual(response.status_code, 400)
            mock_save_tasks.assert_not_called()

    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_invalid_employee_exception(self, mock_save_tasks):
        mock_save_tasks.side_effect = Exception(
            "Cannot add or update a child row"
        )
        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={
                "name": "Backend API",
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 999
            }

        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Invalid employee id"
            )
            self.assertEqual(response.status_code, 400)
    @patch('controllers.task_controller.save_tasks')
    def test_post_tasks_internal_server_error(self, mock_save_tasks):
        mock_save_tasks.side_effect = Exception(
            "Random Error"
        )
        with self.app.test_request_context(
            '/tasks',
            method='POST',
            json={

                "name": "Backend API",
                "priority": "high",
                "status": "pending",
                "due_date": "2026-06-01",
                "employee_id": 1
            }
        ):
            response = post_tasks()
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Internal Server Error"
            )
            self.assertEqual(response.status_code, 500)

    @patch('controllers.task_controller.update_task')
    def test_update_tasks_success(self, mock_update_task):
        mock_update_task.return_value = True
        with self.app.test_request_context(
            '/tasks/1',
            method='PUT',
            json={
                "name": "Updated Task",
                "priority": "medium",
                "status": "completed",
                "due_date": "2026-06-10",
                "employee_id": 1
            }
        ):
            response = update_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Task updated successfully"
            )

    @patch('controllers.task_controller.update_task')
    def test_update_tasks_failure(self, mock_update_task):
        mock_update_task.return_value = False
        with self.app.test_request_context(
            '/tasks/1',
            method='PUT',
            json={
                "name": "Updated Task",
                "priority": "medium",
                "status": "completed",
                "due_date": "2026-06-10",
                "employee_id": 1
            }

        ):
            response = update_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Task update failed"

            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.task_controller.update_task')
    def test_update_tasks_invalid_employee_exception(self, mock_update_task):
        mock_update_task.side_effect = Exception(
            "Cannot add or update a child row"
        )

        with self.app.test_request_context(
            '/tasks/1',
            method='PUT',
            json={
                "name": "Updated Task",
                "priority": "medium",
                "status": "completed",
                "due_date": "2026-06-10",
                "employee_id": 999
            }

        ):

            response = update_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Invalid employee id"
            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.task_controller.update_task')
    def test_update_tasks_name_too_long(self, mock_update_task):
        mock_update_task.return_value = True
        long_name = 'a' * 256
        with self.app.test_request_context(
            '/tasks/1',
            method='PUT',
            json={
                "name": long_name,
                "priority": "medium",
                "status": "completed",
                "due_date": "2026-06-10",
                "employee_id": 1
            }

        ):
            response = update_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Task name cannot exceed 255 characters"
            )
            self.assertEqual(response.status_code, 400)
            mock_update_task.assert_not_called()

    @patch('controllers.task_controller.delete_task')
    def test_remove_tasks_success(self, mock_delete_task):
        mock_delete_task.return_value = True
        with self.app.test_request_context(
            '/tasks/1',
            method='DELETE'

        ):
            response = remove_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['message'],
                "Task deleted successfully"
            )

    @patch('controllers.task_controller.delete_task')
    def test_remove_tasks_failure(self, mock_delete_task):
        mock_delete_task.return_value = False
        with self.app.test_request_context(
            '/tasks/1',
            method='DELETE'
        ):
            response = remove_tasks(1)
            data = response.get_json()
            self.assertEqual(
                data['error'],
                "Task delete failed"
            )
            self.assertEqual(response.status_code, 400)

    @patch('controllers.task_controller.delete_task')
    def test_remove_tasks_internal_server_error(self, mock_delete_task):

        mock_delete_task.side_effect = Exception(

            "Random Error"

        )

        with self.app.test_request_context(

            '/tasks/1',
            method='DELETE'

        ):

            response = remove_tasks(1)
            data = response.get_json()

            self.assertEqual(
                data['error'],
                "Internal Server Error"
            )
            self.assertEqual(response.status_code, 500)

if __name__ == '__main__':
    unittest.main()

