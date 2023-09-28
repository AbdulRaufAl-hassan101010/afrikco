from server import db
from flask import jsonify
from server.models.token import Token
from datetime import datetime, timedelta
import uuid
from server.apis.utils import serialize

def generate_token(user_id):
    try:
        token_value = uuid.uuid4()

        if not token_value:
            return jsonify({"error": "Token value is required"}), 400

        # Calculate the expiration time as 15 minutes from the current time
        expiration_time = datetime.utcnow() + timedelta(minutes=15)

        token = Token(token=token_value, expire_at=expiration_time, user_id=user_id)
        db.session.add(token)
        db.session.commit()

        return token
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}
    

def is_expired(token):    
    try:
        token = Token.query.filter_by(token=token).first()

        if token:
            db.session.delete(token)
            db.session.commit()

        if token and token.is_expired():
            return None
        else:           
            return token
    except Exception as e:
        return {"error": str(e)}
        

def create_token():
    try:
        token = generate_token()
        return jsonify(serialize(token)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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