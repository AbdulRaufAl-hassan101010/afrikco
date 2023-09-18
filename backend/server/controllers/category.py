from flask import request, jsonify
from server.models import Category
from server import db
from server.apis.utils import serialize

def add_category():
    print(12344)
    try:
        # db.engine.connect()
        # get json data from client
        form_data = request.get_json()
        name = form_data.get('name')

        # validate and refine data
        # save to database
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()

        serialized_data = serialize(category)
        return jsonify(serialized_data), 201

    except Exception as error:
        print(error, 111)
        return "add category error"
    

def get_categories(id=None):
    try:
        # db.engine.connect()
        if id is not None:
            # Retrieve a specific category by ID
            category = Category.query.get(id)
            if category is not None:
                serialized_data = serialize(category)
                return jsonify(serialized_data), 200
            else:
                return jsonify({"error": "Category not found"}), 404
        else:
            # Retrieve all categories
            categories = Category.query.all()

            if len(categories) < 1:
                return [], 200
            serialized_data = serialize(categories)
            return jsonify(serialized_data), 200

    except Exception as error:
        print(error)
        return jsonify({"error": "Failed to retrieve categories"}), 500
    

def update_category(id):
    try:
        # db.engine.connect()
        # Retrieve the existing category by id
        category = Category.query.get(id)

        # Check if the category exists
        if category is None:
            return jsonify({"error": "Category not found"}), 404

        # Extract the new name from the request JSON data
        data = request.get_json()
        new_name = data.get('name')

        # Update the name field if a new name is provided
        if new_name is not None:
            category.name = new_name

            # Commit the changes to the database
            db.session.commit()

            # Serialize and return the updated category
            serialized_data = serialize(category)
            return jsonify(serialized_data), 200
        else:
            return jsonify({"error": "Invalid or missing 'name' field in the request"}), 400

    except Exception as error:
        print(error)
        return jsonify({"error": "Failed to update category"}), 500