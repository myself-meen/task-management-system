from flask import request, jsonify

from models.task_model import (
    get_tasks,
    save_tasks,
    update_task,
    delete_task
)

MAX_TASK_NAME_LENGTH = 255

def response_json(payload, status=200):
    response = jsonify(payload)
    response.status_code = status
    return response

def fetch_tasks():
    try:
        priority = request.args.get('priority')
        status = request.args.get('status')
        search = request.args.get('search')
        tasks = get_tasks(
            priority,
            status,
            search
        )
        return jsonify(tasks)
    except Exception as e:
        print(type(e))

        print(repr(e))
        print(e)
        return response_json({
            "error": "Internal Server Error"
        }, 500)
def post_tasks():
    try:
        task_id = None
        name = request.json.get('name')
        priority = request.json.get('priority')
        status = request.json.get('status')
        due_date = request.json.get('due_date')
        employee_id = request.json.get('employee_id')

        if not name or not str(name).strip():
            return response_json({
                "error": "Task name is required"
            }, 400)
        if len(name) > MAX_TASK_NAME_LENGTH:
            return response_json({
                "error": f"Task name cannot exceed {MAX_TASK_NAME_LENGTH} characters"
            }, 400)

        success = save_tasks(
            task_id,
            name,
            priority,
            status,
            due_date,
            employee_id

        )


        if success:
            return response_json({
                "message": "Task saved successfully"
            }, 200)
        else:
            return response_json({
                "error": "Task save failed"
            }, 400)
    except Exception as e:
        print(e)
        if "Duplicate entry" in str(e):
            return response_json({
                "error": "Duplicate task entry"
            }, 409)
        elif "Cannot add or update a child row" in str(e):
            return response_json({
                "error": "Invalid employee id"
            }, 400)
        elif "Incorrect date value" in str(e):
            return response_json({
                "error": "Invalid due date"
            }, 400)


        return response_json({
            "error": "Internal Server Error"
        }, 500)



def update_tasks(task_id):
    try:
        name = request.json.get('name')
        priority = request.json.get('priority')
        status = request.json.get('status')
        due_date = request.json.get('due_date')
        employee_id = request.json.get('employee_id')

        if not name or not str(name).strip():
            return response_json({
                "error": "Task name is required"
            }, 400)
        if len(name) > MAX_TASK_NAME_LENGTH:
            return response_json({
                "error": f"Task name cannot exceed {MAX_TASK_NAME_LENGTH} characters"
            }, 400)

        success = update_task(
            task_id,
            name,
            priority,
            status,
            due_date,
            employee_id

        )
        if success:
            return response_json({
                "message": "Task updated successfully"
            }, 200)
        else:
            return response_json({
                "error": "Task update failed"
            }, 400)


    except Exception as e:

        print(e)
        if "Cannot add or update a child row" in str(e):
            return response_json({
                "error": "Invalid employee id"
            }, 400)
        elif "Incorrect date value" in str(e):
            return response_json({
                "error": "Invalid due date"
            }, 400)
        return response_json({
            "error": "Internal Server Error"
        }, 500)




def remove_tasks(task_id):
    try:
        success = delete_task(task_id)
        if success:
            return response_json({
                "message": "Task deleted successfully"
            }, 200)
        else:
            return response_json({
                "error": "Task delete failed"
            }, 400)

    except Exception as e:
        print(e)
        if "Cannot delete or update a parent row" in str(e):
            return response_json({
                "error": "Task is linked to another record"
            }, 409)
        return response_json({
            "error": "Internal Server Error"
        }, 500)