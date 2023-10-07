from flask import request, jsonify, session
from server.models import Rating, Product
from server import db
from server.apis.utils import serialize
from server.controllers.token import remove_token_by_token
from sqlalchemy import func

def create_rating():
    try:
        data = request.get_json()
        score = int(data.get('score'))
        user_id = session.get('user_id')
        product_id = data.get('product_id')
        comment = data.get('comment')
        token = data.get('token')

        

        
        if not (score and user_id and product_id and comment and token):
            return jsonify({"error": "Missing data"}), 400
        
        if(score > 5):
            return jsonify({"error": "ratings cant be more than 5"}), 400
        
        
        

        rating = Rating(score=score, user_id=user_id, product_id=product_id, comment=comment)
        product = Product.query.get(product_id)

        if product is None:
            return jsonify({"Not Found": "Product not found"}), 404
        
        # Query the database to get the sum of ratings for the product
        rating_sum = Rating.query.filter_by(product_id=product_id).with_entities(func.sum(Rating.score)).scalar()

        if rating_sum is None:
            rating_sum = 0

        # Query the database to get the number of users who rated the product
        num_users_rated = Rating.query.filter_by(product_id=product_id).count()

        # Calculate the average rating
        if rating_sum == 0 or num_users_rated == 0:
            average_rating = 0
        else:
            average_rating = rating_sum / num_users_rated
        

        product.rating = average_rating

        
        remove_token_by_token(token)
        db.session.add(rating)
        db.session.commit()
        return jsonify({"message": "Rating created successfully"}), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

def get_ratings(product_id):
    try:
        ratings = Rating.query.filter_by(product_id=product_id).all()
        serialized_data = serialize(ratings)

        for index, rating in enumerate(ratings):
            user = serialize(rating.user)
            serialized_data[index]['username'] = user['username']
            
        return jsonify(serialized_data), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Error"})

    


def get_rating(product_id, id):
    
    try:
        rating = Rating.query.filter_by(product_id=product_id, rating_id=id).first()
        if rating:
            return jsonify(serialize(rating)), 200
        return jsonify({"error": "Rating not found"}), 404
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Internal Error"})



