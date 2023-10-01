class UnauthorizedError(Exception):
    def __init__(self, error_dict={"error": "Unauthorized", "message":"Unauthorized"}):
        self.error_dict = error_dict
        super().__init__(self.error_dict)

class NotFoundError(Exception):
    def __init__(self, error_dict={"error": "Not Found", "message":"Not Found"}):
        self.error_dict = error_dict
        super().__init__(self.error_dict)
