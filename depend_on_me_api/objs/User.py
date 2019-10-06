from flask_login.mixins import UserMixin


class User(UserMixin):

    # id: str
    # password: str
    # email :str
    # first_name: str
    # last_name: str
    def __init__(
        self,
        id: str = None,
        password: str = None,
        email: str = None,
        first_name: str = None,
        last_name: str = None,
        privilege: int = None,
    ):
        self.id = id
        self.password = password
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.privilege = privilege

    def is_active(self):
        return True

    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id
