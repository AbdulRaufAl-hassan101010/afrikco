from datetime import datetime
from server import db

class Token(db.Model):
    __tablename__ = 'tokens'

    token_id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    expire_at = db.Column(db.DateTime, nullable=False)

    # Define the foreign key relationship to the User model (assuming users are giving ratings)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    def __init__(self, user_id, token, expire_at):
        self.token = token
        self.user_id = user_id
        self.expire_at = expire_at

    def is_expired(self):
        """
        Check if the token has expired.
        Returns True if the token has expired, False otherwise.
        """
        current_time = datetime.utcnow()
        print(current_time >= self.expire_at)
        return current_time >= self.expire_at

    def __repr__(self):
        return f'<Role {self.token_id}: {self.token}>'
    
    def to_dict(self):
        return {
            'token_id': self.token_id,
            'token': self.token,
            'created_at': self.created_at,
            'expire_at': self.expire_at,
            'expire_at': self.expire_at,
        }
