from server.apis.api_blueprint import apis_blueprint
from server.controllers.user import *

# Create a route to login a new user
@apis_blueprint.route('users/login', methods=['POST'])
def login_user_route():
    return login_user()



# Create a route to create a new user
@apis_blueprint.route('users', methods=['POST'])
def create_user_route():
    return create_user()



# Create a route to retrieve all users
@apis_blueprint.route('users', methods=['GET'])
def get_users_route():
    return get_users



# Create a route to retrieve a specific user by ID
@apis_blueprint.route('users/<int:id>', methods=['GET'])
def get_user_route(id):
    return get_user(id=id)


# Create a route to update a user by ID
@apis_blueprint.route('users/<int:id>', methods=['PUT'])
def update_user_route(id):
    return update_user(id=id)


# Create a route to logout user
@apis_blueprint.route("users/logout", methods=["POST"])
def logout_route():
    return logout()