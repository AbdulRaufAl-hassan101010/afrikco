from server import db
from datetime import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    verified = db.Column(db.Boolean, nullable=False, default=False)

    
    # Define the foreign key relationship to Role
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'), nullable=False)
    
    # Define a relationship to access the Role model
    role = db.relationship('Role', backref=db.backref('users', lazy=True))

    def __init__(self, username, email, password, role_id):
        self.username = username
        self.email = email
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self.role_id = role_id

    def set_password(self, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'
