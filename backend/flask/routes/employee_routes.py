from flask import Blueprint

from controllers.employee_controller import (fetch_employees, post_employees, update_employees, remove_employees)


employee_routes = Blueprint(

    'employee_routes',

    __name__

)


employee_routes.route(

    '/v1/employees',

    methods=['GET']

)(fetch_employees)
employee_routes.route(

    '/v1/employees',

    methods=['POST']

)(post_employees)
employee_routes.route(

      '/v1/employees/<int:employee_id>',
    methods=['PUT']
)(update_employees)
employee_routes.route(

      '/v1/employees/<int:employee_id>',

    methods=['DELETE']

)(remove_employees)