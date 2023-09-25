from server import db
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'

    cart_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Define a relationship to access the Product model
    product = db.relationship('Product', backref=db.backref('carts', lazy=True))

    # Define a unique constraint on user_id and product_id
    __table_args__ = (
        db.UniqueConstraint('user_id', 'product_id', name='unique_cart_entry'),
    )

    def __init__(self, product_id, quantity, user_id):
        self.product_id = product_id
        self.quantity = quantity
        self.user_id = user_id

    def __repr__(self):
        return f'<Cart {self.cart_id}: Product {self.product_id} for User {self.user_id}>'
