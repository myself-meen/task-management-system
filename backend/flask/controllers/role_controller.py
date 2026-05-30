from flask import request, jsonify

from models.role_model import get_roles


def fetch_roles():

    try:

        department = request.args.get('department')


        roles = get_roles(department)


        return jsonify(roles)


    except Exception as e:

        print(e)

        return jsonify({

            "error": "Internal Server Error"

        })