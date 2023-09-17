from server.apis.api_blueprint import apis_blueprint
from server.controllers.role import *


# Define the route for adding a role
@apis_blueprint.route('categories', methods=['POST'])
def add_role_route():
    return add_role()

# Define the route for getting a role by id or getting all categories
@apis_blueprint.route('/categories', methods=['GET'])
@apis_blueprint.route('/categories/<int:id>', methods=['GET'])
def get_roles_route(id=None):
    return get_roles(id)


# Define the route for updating a role by id
@apis_blueprint.route('/categories/<int:id>', methods=['PUT'])
def update_role_route(id):
    return update_role(id)