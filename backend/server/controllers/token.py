from server import db
from flask import jsonify, session
from server.models.token import Token
from datetime import datetime, timedelta
import uuid
from server.apis.utils import serialize
from server.utils import NotFoundError, UnauthorizedError



def generate_token(user_id, minutes=15):
    try:
        token_value = uuid.uuid4()

        if not token_value:
            raise ValueError("Token value is required")

        # Calculate the expiration time as 15 minutes from the current time
        expiration_time = datetime.utcnow() + timedelta(minutes=minutes)

        token = Token(token=token_value, expire_at=expiration_time, user_id=user_id)
        db.session.add(token)
        db.session.commit()

        return token
    except Exception as e:
        db.session.rollback()
        raise e  # Raise the exception

def is_expired(token):
    try:
        if(session.get('user_id')) :
            token = Token.query.filter_by(token=token, user_id=session.get('user_id')).first()
        else:
            token = Token.query.filter_by(token=token).first()

        print(token)

        if token is None:           
            raise NotFoundError({"error": "Not Found", "message": "Not Found"})

        if token and token.is_expired():
            # remove token 
            db.session.delete(token)
            db.session.commit()

            raise UnauthorizedError({"error": "Unauthorized", "message": "Token expired"})
        else:
            return token
    except Exception as e:
        raise e  # Raise the exception


def get_token(token):
    try:
        token = is_expired(token)
        serialized_data = serialize(token)
        return jsonify(serialized_data), 200
    except NotFoundError as e:
        print("Not Found:", e)  # Handle the NotFoundError
        return jsonify({"error": "Not Found"}), 404
    except UnauthorizedError as e:
        print("Unauthorized:", e)  # Handle the UnauthorizedError
        return jsonify({"error": "Unauthorized"}), 401
    except Exception as e:
        print("Internal Server Error:", e)  # Handle other exceptions
        return jsonify({"error": "Internal Server Error"}), 500


def create_token():
    try:
        token = generate_token()
        return jsonify(serialize(token)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def remove_token_by_token(token):
    try:
        token = Token.query.filter_by(token=token).first()
        if not token:
            raise NotFoundError()

        db.session.delete(token)
        return {}    
    except Exception as e:
        raise e

def delete_token(token_id):
    try:
        token = Token.query.get(token_id)
        if not token:
            return jsonify({"error": "Token not found"}), 404

        db.session.delete(token)
        db.session.commit()

        return jsonify({"message": "Token deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
