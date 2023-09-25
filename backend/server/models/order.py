from server import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    order_status_id = db.Column(db.Integer, db.ForeignKey('order_status.order_status_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    product = db.relationship('Product', back_populates='orders')


    # # Define a relationship to access the Product model
    # product = db.relationship('Product', back_populates='orders')

   

    def __init__(self, product_id, price, quantity, user_id, order_status_id=1):
        self.product_id = product_id
        self.price = price
        self.quantity = quantity
        self.user_id = user_id
        self.order_status_id = order_status_id
        
    def __repr__(self):
        return f'<Order {self.order_id}: Product {self.product_id}>'
