import re
from flask import request, jsonify

from models.employee_model import (
    get_employees,
    save_employees,
    update_employee,
    delete_employee,
    count_employee_tasks
)

MAX_EMPLOYEE_NAME_LENGTH = 255
MAX_EMPLOYEE_EMAIL_LENGTH = 255
EMAIL_REGEX = re.compile(r"\S+@\S+\.\S+")

def response_json(payload, status=200):
    response = jsonify(payload)
    response.status_code = status
    return response

def fetch_employees():
    try:
        department = request.args.get('department')
        role = request.args.get('role')
        search = request.args.get('search')
        employees = get_employees(
            department,
            role,
            search
        )
        return jsonify(employees)
    except Exception as e:
        print(e)
        return response_json({
            "error": "Internal Server Error"
        }, 500)

def post_employees():
    try:
        employee_id = None
        name = request.json.get('name')
        mail = request.json.get('mail')
        organization_id = request.json.get('organization_id')
        department_id = request.json.get('department_id')
        role_id = request.json.get('role_id')

        if not name or not str(name).strip():
            return response_json({
                "error": "Full Name is required"
            }, 400)
        if len(name) > MAX_EMPLOYEE_NAME_LENGTH:
            return response_json({
                "error": f"Full Name cannot exceed {MAX_EMPLOYEE_NAME_LENGTH} characters"
            }, 400)

        if not mail or not str(mail).strip():
            return response_json({
                "error": "Email Address is required"
            }, 400)
        if not EMAIL_REGEX.match(mail):
            return response_json({
                "error": "Please enter a valid email address"
            }, 400)
        if len(mail) > MAX_EMPLOYEE_EMAIL_LENGTH:
            return response_json({
                "error": f"Email Address cannot exceed {MAX_EMPLOYEE_EMAIL_LENGTH} characters"
            }, 400)

        success = save_employees(
            employee_id,
            name,
            mail,
            organization_id,
            department_id,
            role_id
        )
        if success:
            return response_json({
                "message": "Employee saved successfully"
            }, 200)
        else:
            return response_json({
                "error": "Employee save failed"
            }, 400)
    except Exception as e:
        print(e)
        if "Duplicate entry" in str(e):
            return response_json({
                "error": "Employee mail already exists"
            }, 409)
        elif "Cannot add or update a child row" in str(e):
            return response_json({
                "error": "Invalid organization, department or role id"
            }, 400)
        return response_json({
            "error": "Internal Server Error"
        }, 500)

def update_employees(employee_id):
    try:
        name = request.json.get('name')
        mail = request.json.get('mail')
        department_id = request.json.get('department_id')
        role_id = request.json.get('role_id')

        if not name or not str(name).strip():
            return response_json({
                "error": "Full Name is required"
            }, 400)
        if len(name) > MAX_EMPLOYEE_NAME_LENGTH:
            return response_json({
                "error": f"Full Name cannot exceed {MAX_EMPLOYEE_NAME_LENGTH} characters"
            }, 400)

        if not mail or not str(mail).strip():
            return response_json({
                "error": "Email Address is required"
            }, 400)
        if not EMAIL_REGEX.match(mail):
            return response_json({
                "error": "Please enter a valid email address"
            }, 400)
        if len(mail) > MAX_EMPLOYEE_EMAIL_LENGTH:
            return response_json({
                "error": f"Email Address cannot exceed {MAX_EMPLOYEE_EMAIL_LENGTH} characters"
            }, 400)

        success = update_employee(
            employee_id,
            name,
            mail,
            department_id,
            role_id
        )
        if success:
            return response_json({
                "message": "Employee updated successfully"
            }, 200)
        else:
            return response_json({
                "error": "Employee update failed"
            }, 400)
    except Exception as e:
        print(e)
        if "Duplicate entry" in str(e):
            return response_json({
                "error": "Employee mail already exists"
            }, 409)
        elif "Cannot add or update a child row" in str(e):
            return response_json({
                "error": "Invalid department or role id"
            }, 400)
        return response_json({
            "error": "Internal Server Error"
        }, 500)

def remove_employees(employee_id):
    try:
        task_count = count_employee_tasks(employee_id)
        if task_count > 0:
            return response_json({
                "error": f"Employee has {task_count} assigned task{'s' if task_count != 1 else ''} and cannot be deleted until those tasks are reassigned or removed."
            }, 409)

        success = delete_employee(employee_id)
        if success:
            return response_json({
                "message": "Employee deleted successfully"
            }, 200)
        else:
            return response_json({
                "error": "Employee delete failed"
            }, 400)
    except Exception as e:
        print(e)
        if "Cannot delete or update a parent row" in str(e):
            return response_json({
                "error": "Employee is linked to another record"
            }, 409)
        return response_json({
            "error": "Internal Server Error"
        }, 500)
