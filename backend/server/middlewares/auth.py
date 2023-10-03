from functools import wraps
from flask import session, jsonify


def auth(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({'message': 'unverified'}), 401
        
        return func(*args, **kwargs)
    return decorated_view