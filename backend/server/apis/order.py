from server.apis.api_blueprint import apis_blueprint
from server.middlewares import auth_required, auth_admin
from server.controllers.order import *

# Create an order
@apis_blueprint.route('/orders', methods=['POST'])
@auth_required
def create_order():
    return add_order()


# get orders by order_id
@apis_blueprint.route('/orders/<string:order_id>', methods=['GET'])
@auth_required
def get_orders_route(order_id):
    return get_orders_by_id(order_id)

# get orders by order_id
@apis_blueprint.route('/orders/me', methods=['GET'])
@auth_required
def get_user_orders_route():
    return get_user_orders()


# get orders by order_id
@apis_blueprint.route('/orders/<string:order_id>', methods=['PUT'])
@auth_required
def update_order_route(order_id):
    return update_order(order_id=order_id)


# get orders by order_id
@apis_blueprint.route('/orders', methods=['GET'])
@auth_admin
def get_all_orders_route():
    return get_all_orders()







