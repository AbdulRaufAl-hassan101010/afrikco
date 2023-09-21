from server.apis.api_blueprint import apis_blueprint
from server.controllers.product import *


# Define the route for adding a product
@apis_blueprint.route('products', methods=['POST'])
def add_product_route():
    return add_product()

# Define the route for getting a product by id or getting all products
@apis_blueprint.route('products', methods=['GET'])
@apis_blueprint.route('products/<int:id>', methods=['GET'])
def get_products_route(id=None):
    return get_products(id=id)


# Define the route for updating a product by id
@apis_blueprint.route('products/<int:id>', methods=['PUT'])
def update_product_route(id):
    return update_product(id)

# Define the route to return number of products
@apis_blueprint.route('products/count', methods=['GET'])
def products_count_route():
    return products_count()