from server.apis.api_blueprint import apis_blueprint
from server.controllers.category import *


# Define the route for adding a category
@apis_blueprint.route('categories', methods=['POST'])
def add_category_route():
    return add_category()

# Define the route for getting a category by id or getting all categories
@apis_blueprint.route('/categories', methods=['GET'])
@apis_blueprint.route('/categories/<int:id>', methods=['GET'])
def get_categories_route(id=None):
    return get_categories(id)


# Define the route for updating a category by id
@apis_blueprint.route('/categories/<int:id>', methods=['PUT'])
def update_category_route(id):
    return update_category(id)