from flask import Flask
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS


# create the extension
db = SQLAlchemy()
# create the app
app = Flask(__name__, static_folder="../../frontend/build", static_url_path="")
# configure the SQLite database, relative to the app instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345678@localhost/afrikco'
# initialize the app with the extension
db.init_app(app)
CORS(app)

from server.apis import apis_blueprint
app.register_blueprint(apis_blueprint, url_prefix="/apis")


@app.route('/')
@app.route('/product/<int:int>')
@app.route('/product/login')
def static_pages(int=None):
  return send_from_directory(app.static_folder, 'index.html')


def create_app():
  return app


