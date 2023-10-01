
from flask import session 
from server.apis.api_blueprint import apis_blueprint
from server.controllers.user import *
from server.middlewares import auth_required, auth_verify

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
    return get_users()


# is looged in 
@apis_blueprint.route('users/auth', methods=['GET'])
@auth_required
def is_logged_in_route():
    return get_user(session.get('user_id'))

@apis_blueprint.route('users/verify', methods=['GET'])
@auth_verify
def is_verified_route():
    user_id =session.get('user_id')
    return get_user(id=user_id)

@apis_blueprint.route('users/verify/<string:token>', methods=['PUT'])
def verify_user_route(token):
    return verify_user(token=token)

# Create a route to retrieve a specific user by ID
@apis_blueprint.route('users/<int:id>', methods=['GET'])
def get_user_route(id):
    return get_user(id=id)

# Create a route to update a user by ID
@apis_blueprint.route('users/<int:id>', methods=['PUT'])
def update_user_route(id):
    return update_user(id=id)

# Create a route to send email to user to reset password
@apis_blueprint.route('users/password-reset', methods=['POST'])
def password_reset_route():
    return password_reset()

# Create a route to logout user
@apis_blueprint.route("users/logout", methods=["POST", "GET"])
def logout_route():
    return logout()