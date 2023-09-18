from server import db

def connect_to_database():
    # No need to manually create a new connection; SQLAlchemy will handle it
    return db
