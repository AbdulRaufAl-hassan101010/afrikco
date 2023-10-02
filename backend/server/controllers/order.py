from flask import jsonify, session, request
from server.models import Order,OrderProducts, Product
from server import db
from server.apis.utils import serialize
from server.utils import NotFoundError
import uuid


def add_order():
    """add order"""    
    try:
        json_data = request.get_json()

        order_id = uuid.uuid4()
        user_id = session.get('user_id')

        order = Order(order_id= order_id, user_id=user_id, totals=0)
        db.session.add(order)
        db.session.commit()

        if not isinstance(json_data, list):
            return jsonify({"error": "Invalid data format. Expected a list of order products."}), 400

        # Validate and process each item in the list
        valid_order_products = []
        totals = 0

        for item in json_data:
            if not isinstance(item, dict):
                raise ValueError("Invalid data format for an order product. Expected a dictionary.")
            
            
            if order_id or item['product_id'] or item['quantity']:           
                product = Product.query.get(item['product_id'])

                if product is None:
                    raise NotFoundError()
                
                

                order_product = OrderProducts(
                    order_id= order_id,
                    product_id= item['product_id'],
                    price= product.price,
                    quantity= item['quantity']
                )
                print(order_product)
            else:
                raise ValueError("Invalid data format for an order product. attribute can be product_id, price, quantity.")
            
            # calc totals
            totals += order_product.price * order_product.quantity

            # If validation passes, add the valid order product to the list
            valid_order_products.append(order_product)
        
        # update order totals
        order.totals = totals
        print(valid_order_products)
        db.session.add_all(valid_order_products)
        db.session.commit()

        return jsonify({"message": "Order products added successfully."}), 200

    except Exception as e:
        db.session.delete(order)
        db.session.commit()
        print(e)
        return jsonify(str(e)), 500

def get_orders(order_id):
    try:
        if order_id is None:
            raise ValueError({"error": "Expect order_id", "message": 'order id required'})
        
        order = Order.query.get(order_id)

        if order is None:
            raise NotFoundError({"error": "Not found", "message": 'order not found'})
        
        serialized_data = serialize(order)
        return jsonify(serialized_data), 200
    except NotFoundError as e:
        return jsonify(e), 404
    except ValueError as e:
        return jsonify(e), 400
    except Exception as e:
        return jsonify(str(e))


def update_orders(order_id):
    try:
        pass
    except Exception as e:
        pass