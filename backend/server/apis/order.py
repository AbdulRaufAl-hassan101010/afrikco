from server.apis.api_blueprint import apis_blueprint
from server.middlewares.auth_required import auth_required
from server.controllers.order import *

PENDING_ID = 1

# Create an order
@apis_blueprint.route('/orders', methods=['POST'])
@auth_required
def create_order():
    return add_order()




