from server import db
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'

    cat_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'<Category {self.cat_id}: {self.name}>'
