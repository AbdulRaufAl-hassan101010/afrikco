from server.apis.api_blueprint import apis_blueprint
from flask import jsonify


@apis_blueprint.route("products")
def get_products():
    return jsonify("products")
