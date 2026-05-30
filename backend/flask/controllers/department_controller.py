from flask import jsonify

from models.department_model import get_departments


def fetch_departments():

    try:

        departments = get_departments()

        return jsonify(departments)

    except Exception as e:

        print(e)

        return jsonify({

            "error": "Internal Server Error"

        })