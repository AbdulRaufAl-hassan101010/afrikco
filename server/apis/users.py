from . import apis_blueprint
from models.user import User

@apis_blueprint.route('users')
def get_users():
    # users = User.query.all()
    # print(users)
    return "a"