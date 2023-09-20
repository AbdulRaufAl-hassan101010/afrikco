from sqlalchemy.orm import class_mapper

def serialize(model):
    """Serialize SQLAlchemy model object to a dictionary."""
    if isinstance(model, list):
        # If it's a list of objects, serialize each object and return a list of dictionaries
        return [serialize(obj) for obj in model]
    else:
        # If it's a single object, serialize it to a dictionary
        columns = [c.key for c in class_mapper(model.__class__).columns]
        return {c: getattr(model, c) for c in columns}
