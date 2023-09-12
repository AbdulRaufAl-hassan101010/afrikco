from . import apis_blueprint
from server.models.user import User

@apis_blueprint.route('users')
def get_users():
    # users = User.query.all()
    # print(users)
    return "a"