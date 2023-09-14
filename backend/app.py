from flask import Flask
from flask.helpers import send_from_directory

app = Flask(__name__, static_folder="../client/build", static_url_path="")

# Register the 'apis' blueprint with the Flask app
from apis import apis_blueprint  # Import the 'apis' blueprint from the 'apis' module
app.register_blueprint(apis_blueprint, url_prefix="/apis")

@app.route('/')
@app.route('/product/<int:int>')
@app.route('/login')
def static_pages(int=None):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
