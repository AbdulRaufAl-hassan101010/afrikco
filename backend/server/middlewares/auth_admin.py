from functools import wraps
from flask import session, jsonify


def auth_admin(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if session.get('verified') is False:
            return jsonify({'message': 'unverified'}), 401
        
        if 'user_id' not in session or session.get('role_id') != 2:
            return jsonify({'message': 'Unauthorized'}), 401
        return func(*args, **kwargs)
    return decorated_view