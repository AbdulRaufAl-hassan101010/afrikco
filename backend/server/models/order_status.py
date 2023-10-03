from server import db
from datetime import datetime

class OrderStatus(db.Model):
    __tablename__ = 'order_status'

    order_status_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'<Category {self.order_status_id}: {self.name}>'
