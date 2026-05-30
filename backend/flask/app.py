from flask import Flask

from flask_cors import CORS

from routes.employee_routes import (employee_routes)
from routes.task_routes import (task_routes)
from routes.department_routes import department_bp

from routes.role_routes import role_bp


app = Flask(__name__)

CORS(app)


app.register_blueprint(employee_routes)
app.register_blueprint(task_routes)
app.register_blueprint(department_bp)
app.register_blueprint(role_bp)

@app.route('/')

def home():

    return "Backend Running"


if __name__ == '__main__':

    app.run(debug=True)