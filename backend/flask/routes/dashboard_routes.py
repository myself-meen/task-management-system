from flask import Blueprint
from controllers.dashboard_controller import fetch_dashboard
dashboard_routes = Blueprint(
    'dashboard_routes',
    __name__
)
dashboard_routes.route(
    '/v1/dashboard',
    methods=['GET']
)(fetch_dashboard)