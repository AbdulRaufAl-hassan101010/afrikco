from server.models import Cart
from server import db

# Create a new cart item
def create_cart_item(product_id, quantity, user_id):
    cart_item = Cart(product_id=product_id, quantity=quantity, user_id=user_id)
    db.session.add(cart_item)
    db.session.commit()
    return cart_item

# Get all cart items for a specific user
def get_cart_items_by_user(user_id):
    return Cart.query.filter_by(user_id=user_id).all()

# Get a single cart item by its ID
def get_cart_item_by_id(cart_id):
    return Cart.query.get(cart_id)

# Update an existing cart item
def update_cart_item(cart_id, product_id, quantity, user_id):
    cart_item = Cart.query.get(cart_id)
    if cart_item:
        cart_item.product_id = product_id
        cart_item.quantity = quantity
        cart_item.user_id = user_id
        db.session.commit()
    return cart_item

# Delete a cart item by its ID
def delete_cart_item(cart_id):
    cart_item = Cart.query.get(cart_id)
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
    return cart_item