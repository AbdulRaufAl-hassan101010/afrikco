from server.apis import apis_blueprint
from flask import jsonify

@apis_blueprint.route("products")
def get_products():
  return jsonify("products")