from server.apis.api_blueprint import apis_blueprint
from server.middlewares.auth_required import auth_required
from server.controllers.order import *

# Create an order
@apis_blueprint.route('/orders', methods=['POST'])
@auth_required
def create_order():
    return add_order()


# Create an order
@apis_blueprint.route('/orders/<string:order_id>', methods=['GET'])
@auth_required
def get_orders(order_id):
    return get_orders(order_id)




