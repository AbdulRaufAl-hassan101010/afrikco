from flask import  request, jsonify,session
from server import db  # Import your SQLAlchemy instance
from server.models import Order, Product
from server.apis.api_blueprint import apis_blueprint
from server.middlewares.auth_required import auth_required

PENDING_ID = 1

# Create an order
@apis_blueprint.route('/orders', methods=['POST'])
@auth_required
def create_order():
    data = request.get_json()
    product_id = data.get('product_id')    
    user_id = session.get('user_id')  # Retrieve user_id from the request data
    product_id = data.get('product_id')
    order_status_id = PENDING_ID
    quantity = data.get('quantity')

    if not user_id or not product_id or not order_status_id or not price or not quantity:
        return jsonify({'message': 'Missing data'}), 400
    
    # check if product exist's
    product = Product.query.get(product_id)
    if product is None:
        return jsonify({'message': 'Product no found'}), 404
    
    # use  price in product database
    price = product.price

    order = Order(user_id=user_id, product_id=product_id, order_status_id=order_status_id, price=price, quantity=quantity)

    try:
        db.session.add(order)
        db.session.commit()
        return jsonify({'message': 'Order created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
    


# Get all orders
@apis_blueprint.route('/orders', methods=['GET'])
@auth_required
def get_orders():
    orders = Order.query.all()
    serialized_orders = [{'order_id': order.order_id, 'product_id': order.product_id, 'quantity': order.quantity, 'price': order.price} for order in orders]
    return jsonify(serialized_orders), 200

