# Import the 'apis' blueprint from the 'apis' module
from server.apis import apis_blueprint
from flask import Flask
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy

# store your mysql database connection credentials in the environment variable and get them for security reasons
from os import environ
db_user = environ.get("db_user")
db_password = environ.get("db_password")
db_name = environ.get("db_name")
db_host = environ.get("db_host")

app = Flask(__name__, static_folder="../client/build", static_url_path="")


db = SQLAlchemy()
# configure the SQLite database, relative to the app instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}"
# initialize the app with the extension
db.init_app(app)



try:
    import server.models
    with app.app_context():
        db.create_all()
except Exception as ex:
    print(f"An error occurred: {ex}")

    
# Register the 'apis' blueprint with the Flask app
app.register_blueprint(apis_blueprint, url_prefix="/apis")


@app.route('/')
@app.route('/product/<int:int>')
@app.route('/login')
def static_pages(int=None):
    return send_from_directory(app.static_folder, 'index.html')


