from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

# create the extension
db = SQLAlchemy()
# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345678@localhost/afrikco'
# initialize the app with the extension
db.init_app(app)

from apis import apis_blueprint
app.register_blueprint(apis_blueprint, url_prefix="/apis")


if __name__ == '__main__':
  with app.app_context():
    import models
    db.create_all()
  app.run(port=5000, debug=True)