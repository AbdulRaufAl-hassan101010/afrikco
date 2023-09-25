from functools import wraps
from flask import session, jsonify


def auth_admin(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if 'user_id' not in session and session.get('role_id') == 2:
            return jsonify({'message': 'Unauthorized'}), 401
        return func(*args, **kwargs)
    return decorated_view