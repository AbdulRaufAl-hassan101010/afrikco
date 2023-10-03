from server import db
from datetime import datetime

class OrderProducts(db.Model):
    __tablename__ = 'order_products'
    order_product_id =db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(255),db.ForeignKey('orders.order_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

     # Define a unique constraint on order_id and product_id
    __table_args__ = (
        db.UniqueConstraint('order_id', 'product_id', name='unique_order_entry'),
    )

    # Define a relationship to OrderProducts
    product = db.relationship('Product', backref='order_products', lazy=True)
   

    def __init__(self, order_id, product_id, price, quantity):
        self.order_id = order_id
        self.product_id = product_id
        self.price = price
        self.quantity = quantity

    
    def __repr__(self):
        return f'<OrderProducts {self.order_id}: Product {self.product_id}>'
