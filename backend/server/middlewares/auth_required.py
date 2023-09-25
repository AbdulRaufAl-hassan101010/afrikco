from functools import wraps
from flask import session, jsonify


def auth_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if 'user_id' not in session or  session.get('user_id') is None:
            return jsonify({'message': 'Unauthorized'}), 401
        return func(*args, **kwargs)
    return decorated_view