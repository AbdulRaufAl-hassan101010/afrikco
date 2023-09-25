from flask import  request, jsonify,session
from server import db  # Import your SQLAlchemy instance
from server.models import Order, Product
from server.apis.api_blueprint import apis_blueprint
from server.middlewares.auth_required import auth_required
from server.apis.utils import serialize

PENDING_ID = 1

# Create an order
@apis_blueprint.route('/orders', methods=['POST'])
@auth_required
def create_order():
    try:
        data = request.get_json()
        product_id = data.get('product_id')    
        user_id = session.get('user_id')  # Retrieve user_id from the request data
        order_status_id = PENDING_ID
        quantity = data.get('quantity')

        if not user_id or not product_id or not order_status_id  or not quantity:
            return jsonify({'message': 'Missing data'}), 400
        
        # check if product exist's
        product = Product.query.get(product_id)
        if product is None:
            return jsonify({'message': 'Product no found'}), 404
        
        if product.quantity < quantity:
            return jsonify({'message': 'insufficient quantity'}), 400
        
        # use  price in product database
        price = product.price

        order = Order(user_id=user_id, product_id=product_id, price=price, quantity=quantity)

    
        db.session.add(order)
        db.session.commit()

        serialized_data = serialize(order)
        return jsonify(serialized_data), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
    


# Get all orders
@apis_blueprint.route('/orders', methods=['GET'])
@auth_required
def get_orders():
    try:
        orders = Order.query.all()
        serialized_data = serialize(orders)
        return jsonify(serialized_data), 200
    except Exception as error:
        return jsonify(str(error))
    

# Get product orders
@apis_blueprint.route('/orders/<int:product_id>', methods=['GET'])
@apis_blueprint.route('/orders/<int:product_id>/<int:status_id>', methods=['GET'])
@auth_required
def get_product_orders(product_id, status_id=None):
    if product_id is None:
        return jsonify({'message': f'product not found'}), 404
    
    try:
        query = Order.query.filter_by(product_id=product_id)

        if status_id:
            query = Order.query.filter_by(order_status_id=status_id)

        orders = query.all()
        serialized_data = serialize(orders)
        return jsonify(serialized_data), 200
    except Exception as error:
        return jsonify(str(error))
    

# Get product orders
@apis_blueprint.route('/orders/count', methods=['GET'])
@auth_required
def get_orders_count():
    try:
        orders_count = Order.query.count()
        return jsonify(orders_count), 200
    except Exception as error:
        return jsonify(str(error))




