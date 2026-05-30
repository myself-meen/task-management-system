from flask import Blueprint

from controllers.department_controller import fetch_departments


department_bp = Blueprint(

    'department_bp',
    __name__

)


department_bp.route(

    '/v1/departments',
    methods=['GET']

)(fetch_departments)