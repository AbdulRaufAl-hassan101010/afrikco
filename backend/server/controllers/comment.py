from flask import request, jsonify
from server.models import Comment
from server import db
from server.apis.utils import serialize
from sqlalchemy.exc import IntegrityError

def create_comment():
    try:
        # get date from client
        data = request.get_json()
        text = data.get('text')
        product_id = data.get('product_id')

        if not text or not product_id:
            return jsonify({"error": "Text and product_id are required"}), 400

        new_comment = Comment(text=text, product_id=product_id)
        db.session.add(new_comment)
        db.session.commit()

        return jsonify({"message": "Comment created successfully"}), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Integrity error: " + str(e)}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

def get_comments():
    comments = Comment.query.all()
    serialized_comments = serialize(comments)
    return jsonify(serialized_comments), 200


def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    serialized_comment = serialize(comment)
    return jsonify(serialized_comment), 200


def update_comment(comment_id):
    try:
        comment = Comment.query.get(comment_id)
        if not comment:
            return jsonify({"error": "Comment not found"}), 404

        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({"error": "Text is required"}), 400

        comment.text = text
        db.session.commit()

        return jsonify({"message": "Comment updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500