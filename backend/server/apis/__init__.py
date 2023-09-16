from flask import Blueprint, jsonify

# Create a Blueprint object for your API routes
apis_blueprint = Blueprint('apis', __name__)


from .products import * 