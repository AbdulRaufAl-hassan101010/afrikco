from server import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.String(255), primary_key=True)
    order_status_id = db.Column(db.Integer, db.ForeignKey('order_status.order_status_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    totals = db.Column(db.Float, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Define a relationship to OrderProducts
    orders = db.relationship('OrderProducts', backref='order', lazy=True)
   

    def __init__(self, order_id, user_id, totals=0, order_status_id=1):
        self.order_id = order_id
        self.user_id = user_id
        self.totals = totals
        self.order_status_id = order_status_id
        
    def __repr__(self):
        return f'<Order {self.order_id}: Product {self.product_id}>'
