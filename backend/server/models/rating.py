from server import db
from datetime import datetime

class Rating(db.Model):
    __tablename__ = 'ratings'

    rating_id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    comment = db.Column(db.Text, nullable=True)

    # Define the foreign key relationship to the User model (assuming users are giving ratings)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    # Define a relationship to access the User model
    user = db.relationship('User', backref=db.backref('ratings', lazy=True))

    # Define the foreign key relationship to the Product model (assuming products are being rated)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)

    # Define a relationship to access the Product model
    product = db.relationship('Product', backref=db.backref('ratings', lazy=True))

    def __init__(self, score, user_id, product_id):
        self.score = score
        self.user_id = user_id
        self.product_id = product_id

    def __repr__(self):
        return f'<Rating {self.rating_id} for Product {self.product.name} by User {self.user.username}>'
