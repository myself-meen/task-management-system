from flask import Blueprint

from controllers.role_controller import fetch_roles


role_bp = Blueprint(

    'role_bp',
    __name__

)


role_bp.route(

    '/v1/roles',
    methods=['GET']

)(fetch_roles)