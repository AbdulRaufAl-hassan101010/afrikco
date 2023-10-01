from server.apis.api_blueprint import apis_blueprint
from server.controllers.token import *


# create route to get token
@apis_blueprint.route('/tokens/<string:token>', methods=['GET'])
def get_token_route(token):
    return get_token(token)

# Delete a specific token by ID
@apis_blueprint.route('/tokens/<int:token_id>', methods=['DELETE'])
def delete_token_route(token_id):
    return delete_token(token_id=token_id)