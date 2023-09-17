from flask import jsonify
from flask import request, jsonify
from server.apis.api_blueprint import apis_blueprint
from server.models import Category
from server import db
from .utils import serialize


# ADD CATEGORY
@apis_blueprint.route('categories', methods=['POST'])
def add_category():
    try:
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
        print(error)
        return "add category error"


# Import necessary modules

# ...

# GET CATEGORY

@apis_blueprint.route('/categories', methods=['GET'])
@apis_blueprint.route('/categories/<int:id>', methods=['GET'])
def get_categories(id=None):
    try:
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
            serialized_data = serialize(categories)
            return jsonify(serialized_data), 200

    except Exception as error:
        print(error)
        return jsonify({"error": "Failed to retrieve categories"}), 500


# Define the route for updating a category by cat_id
@apis_blueprint.route('/categories/<int:cat_id>', methods=['PUT'])
def update_category(cat_id):
    try:
        # Retrieve the existing category by cat_id
        category = Category.query.get(cat_id)

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
