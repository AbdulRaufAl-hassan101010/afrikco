from flask import request, jsonify, session
from server.models import Cart, Product
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
        user_id = session.get('user_id')

        # Retrieve cart entries for the user
        cart_entries = Cart.query.filter_by(user_id=user_id).all()

        # Create a list to store product info for each item in the cart
        cart_info = []

        # Get the product IDs from cart entries
        product_ids = [cart_entry.product_id for cart_entry in cart_entries]

        # Retrieve product details for the product IDs in the cart
        products = Product.query.filter(Product.product_id.in_(product_ids)).all()

        # Iterate through cart entries and merge product details
        for cart_entry in cart_entries:
            product_id = cart_entry.product_id
            product = next((p for p in products if p.product_id == product_id), None)

            if product:
                cart_item_info = {
                    'product_info': product.to_dict(),  # Use the to_dict method
                    'quantity': cart_entry.quantity  # Include quantity from cart entry
                }
                cart_info.append(cart_item_info)

        # Now, cart_info contains a list of dictionaries with product info and quantities    

        return jsonify(cart_info), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


    



@apis_blueprint.route('/carts/<int:product_id>', methods=['PUT'])
@auth_required
def update_cart_entry(product_id):
    data = request.get_json()
    quantity = data.get('quantity')

    if quantity is None:
        return jsonify({"error": "Missing quantity"}), 400
    
    user_id=session.get('user_id')
    cart_entry = Cart.query.filter_by(product_id=product_id, user_id= user_id).first()

    if cart_entry is None:
        return jsonify({"error": "Cart entry not found"}), 404

    cart_entry.quantity = quantity

    try:
        db.session.commit()
        return jsonify({"message": "Cart entry updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@apis_blueprint.route('/carts/<int:product_id>', methods=['DELETE'])
@auth_required
def delete_cart_entry(product_id):
    user_id=session.get('user_id')
    cart_entry = Cart.query.filter_by(product_id=product_id, user_id= user_id).first()

    if cart_entry is None:
        return jsonify({"error": "Cart entry not found"}), 404

    try:
        db.session.delete(cart_entry)
        db.session.commit()
        return jsonify({"message": "Cart entry deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
