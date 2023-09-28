from server.apis.api_blueprint import apis_blueprint
from server.controllers.token import *


@apis_blueprint.route('/tokens', methods=['POST'])
def create_token_route():
    return create_token()


# Delete a specific token by ID
@apis_blueprint.route('/tokens/<int:token_id>', methods=['DELETE'])
def delete_token_route(token_id):
    return delete_token(token_id=token_id)