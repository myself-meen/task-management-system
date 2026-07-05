from flask import jsonify
from models.dashboard_model import get_dashboard_data
def fetch_dashboard():
    try:
        data = get_dashboard_data()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({
            "error": "Internal Server Error"
        }), 500