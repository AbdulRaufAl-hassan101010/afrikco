from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.helpers import send_from_directory

# store your mysql database connection credentials in the environment variable and get them for security reasons
from os import environ
DB_USERNAME = environ.get("DB_USERNAME")
DB_PASSWORD = environ.get("DB_PASSWORD")
DB_NAME = environ.get("DB_NAME")
DB_HOST = environ.get("DB_HOST")


app = Flask(__name__, static_folder="../../client/build", static_url_path="")


db = SQLAlchemy()
# configure the SQLite database, relative to the app instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
# initialize the app with the extension
db.init_app(app)

print(1234)

try:
    import server.models
    with app.app_context():
        db.create_all()
except Exception as ex:
    print(f"An error occurred: {ex}")

# Import the 'apis' blueprint from the 'apis' module
from server.apis import apis_blueprint    
# Register the 'apis' blueprint with the Flask app
app.register_blueprint(apis_blueprint, url_prefix="/apis")


@app.route('/')
@app.route('/product/<int:int>')
@app.route('/login')
def static_pages(int=None):
    return send_from_directory(app.static_folder, 'index.html')


def create_app():
    return app


