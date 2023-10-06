from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

# Load database credentials from environment variables
DB_USERNAME = environ.get("DB_USERNAME")
DB_PASSWORD = environ.get("DB_PASSWORD")
DB_NAME = environ.get("DB_NAME")
DB_HOST = environ.get("DB_HOST")
SECRET = environ.get("SECRET")
ENVIRONMENT = environ.get("NODE_ENV", "development")

# Define the base URL for both development and production
if ENVIRONMENT == "production":
    base_url = "https://ghantrade.onrender.com"  # Change this to your production domain
else:
    base_url = "http://localhost:3000"  # Default to development domain


app = Flask(__name__, static_folder="../../client/build", static_url_path="")
db = SQLAlchemy()
CORS(app)

# Configure the MySQL database connection URI
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config['SECRET_KEY'] = SECRET


# Initialize the app with the SQLAlchemy extension
db.init_app(app)


# Create database tables if they don't exist
try:
    with app.app_context():
        import server.models  # Import your models
        db.create_all()
    
    
except Exception as ex:
    print(f"An error occurred: {ex}")


# Import the 'apis' blueprint from the 'apis' module
from server.apis import apis_blueprint

# Register the 'apis' blueprint with the Flask app
app.register_blueprint(apis_blueprint, url_prefix="/apis")


# Define routes for static pages
@app.route('/')
@app.route('/products/<int:id>')
@app.route('/login')
@app.route('/cart')
@app.route('/orders')
@app.route('/signup')
@app.route('/password-reset')
@app.route('/password-reset/<string:token>')
@app.route('/users/success')
@app.route('/users/verify/<string:tok>')
@app.route('/users/verification/email')
@app.route('/dashboard')
@app.route('/dashboard/products/add')
@app.route('/dashboard/orders')
@app.route('/dashboard/users')
def static_pages(token, tok, id):
    return send_from_directory(app.static_folder, 'index.html')


# Define a function to create the Flask app
def create_app():
    return app
