from server import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    comment_id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Define the foreign key relationship to Product
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)

    # # Define a relationship to access the Product model
    # product = db.relationship('Product', backref=db.backref('comments', lazy=True))

    def __init__(self, text, product_id):
        self.text = text
        self.product_id = product_id

    def __repr__(self):
        return f'<Comment {self.comment_id} for Product {self.product.name}>'
