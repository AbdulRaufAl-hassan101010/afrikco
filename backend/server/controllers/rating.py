from flask import request, jsonify
from server.models import Rating
from server import db
from server.apis.utils import serialize

def create_rating():
    data = request.get_json()
    score = data.get('score')
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    if not (score and user_id and product_id):
        return jsonify({"error": "Missing data"}), 400

    rating = Rating(score=score, user_id=user_id, product_id=product_id)

    try:
        db.session.add(rating)
        db.session.commit()
        return jsonify({"message": "Rating created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

def get_ratings(product_id):
    ratings = Rating.query.filter_by(product_id=product_id).all()
    serialized_data = serialize(ratings)
    return jsonify(serialized_data), 200


def get_rating(product_id, id):
    rating = Rating.query.filter_by(product_id=product_id, rating_id=id).first()
    if rating:
        return jsonify(serialize(rating)), 200
    return jsonify({"error": "Rating not found"}), 404


def update_rating(id):
    data = request.get_json()
    rating = Rating.query.get(id)
    if not rating:
        return jsonify({"error": "Rating not found"}), 404

    if 'score' in data:
        rating.score = data['score']

    try:
        db.session.commit()
        return jsonify({"message": "Rating updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
