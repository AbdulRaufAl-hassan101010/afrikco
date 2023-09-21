from server.apis.api_blueprint import apis_blueprint
from server.controllers.rating import *

# Create a route to create a new rating
@apis_blueprint.route('ratings', methods=['POST'])
def create_rating_route():
    return create_rating()

# Create a route to retrieve all ratings for a product
@apis_blueprint.route('ratings/<int:product_id>', methods=['GET'])
def get_ratings_route(product_id):
    return get_ratings(product_id=product_id)

# Create a route to retrieve a specific rating by ID
@apis_blueprint.route('ratings/<int:product_id>/<int:id>', methods=['GET'])
def get_rating_route(product_id, id):
   return get_rating(product_id=product_id, id=id)

# Create a route to update a rating by ID
@apis_blueprint.route('ratings/<int:id>', methods=['PUT'])
def update_rating_route(id):
    return update_rating(id=id)
