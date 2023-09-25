from flask import request, jsonify, session
from server.models import Cart
from server import db
from server.apis.api_blueprint import apis_blueprint
from server.middlewares import auth_admin, auth_required
from server.apis.utils import serialize
from server.controllers.product import get_product
from sqlalchemy.exc import IntegrityError

@apis_blueprint.route('/carts', methods=['POST'])
@auth_required
def create_cart_entry():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    if not (product_id and quantity):
        return jsonify({"error": "Missing data"}), 400

    user_id=session.get('user_id')
    cart_entry = Cart(
        product_id=product_id,
        user_id=user_id,
        quantity=quantity,
    )
    

    try:
        product = get_product(id=product_id)

        if product.quantity < quantity :
            return jsonify({'error': "insufficient quantity"}), 400
        
        # save to database
        db.session.add(cart_entry)
        db.session.commit()
        return jsonify({"message": "Cart entry created successfully"}), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Duplicate entry. Product already exists in the cart."}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

@apis_blueprint.route('/carts/admin', methods=['GET'])
@auth_admin
def get_cart_entries():
    cart_entries = Cart.query.all()
    serialized_cart_entries = serialize(cart_entries)
    return jsonify(serialized_cart_entries), 200

@apis_blueprint.route('/carts', methods=['GET'])
@auth_required
def get_user_cart():
    try:
        user_id=session.get('user_id')

        cart_entries = Cart.query.filter_by(user_id=user_id).all()

        serialized_cart_entries = serialize(cart_entries)
        return jsonify(serialized_cart_entries), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    



@apis_blueprint.route('/cart/<int:cart_id>', methods=['PUT'])
@auth_required
def update_cart_entry(cart_id):
    data = request.get_json()
    quantity = data.get('quantity')

    if quantity is None:
        return jsonify({"error": "Missing quantity"}), 400
    
    user_id=session.get('user_id')

    cart_entry = Cart.query.filter_by(cart_id=cart_id, user_id= user_id)

    if cart_entry is None:
        return jsonify({"error": "Cart entry not found"}), 404

    cart_entry.quantity = quantity

    try:
        db.session.commit()
        return jsonify({"message": "Cart entry updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@apis_blueprint.route('/cart/<int:cart_id>', methods=['DELETE'])
@auth_required
def delete_cart_entry(cart_id):
    cart_entry = Cart.query.get(cart_id)

    if cart_entry is None:
        return jsonify({"error": "Cart entry not found"}), 404

    try:
        db.session.delete(cart_entry)
        db.session.commit()
        return jsonify({"message": "Cart entry deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
