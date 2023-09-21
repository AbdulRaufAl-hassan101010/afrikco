from server.apis.api_blueprint import apis_blueprint
from server.controllers.comment import *


@apis_blueprint.route('comments', methods=['POST'])
def create_comment_route():
    return create_comment()


@apis_blueprint.route('comments/<int:product_id>', methods=['GET'])
def get_comments_route(product_id):
    return get_comments(product_id=product_id)


@apis_blueprint.route('comments/<int:comment_id>', methods=['GET'])
def get_comment_route(comment_id):
    return get_comment(comment_id=comment_id)


@apis_blueprint.route('comments/<int:comment_id>', methods=['PUT'])
def update_comment_route(comment_id):
    return update_comment(comment_id=comment_id)

