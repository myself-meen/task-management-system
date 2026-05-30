from flask import Blueprint

from controllers.task_controller import(fetch_tasks, post_tasks, update_tasks, remove_tasks)


task_routes = Blueprint(

    'task_routes',

    __name__

)


task_routes.route(

    '/v1/tasks',

    methods=['GET']

)(fetch_tasks)
task_routes.route(

    '/v1/tasks',

    methods=['POST']

)(post_tasks)
task_routes.route(

      '/v1/tasks/<int:task_id>',

    methods=['DELETE']

)(remove_tasks)
task_routes.route(

      '/v1/tasks/<int:task_id>',

    methods=['PUT']

)(update_tasks)