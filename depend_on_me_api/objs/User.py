from flask_login.mixins import UserMixin


class User(UserMixin):

    # id: str
    # password: str
    # email :str
    # first_name: str
    # last_name: str
    # tasks: list

    def __init__(
        self,
        id: str = None,
        password: str = None,
        email: str = None,
        first_name: str = None,
        last_name: str = None,
        privilege: int = 0,
        tags: list = [],
        privilege: int = None,
    ):
        self.id = id
        self.password = password
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.privilege = privilege
        self.tags = tags

    def is_active(self):
        return True

    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    @staticmethod
    def from_request(request):
        return User(
            id=request.json["request_username"],
            password=request.json["request_password"],
            email=request.json["request_email"],
            first_name=request.json["request_first_name"],
            last_name=request.json["request_last_name"],
        )

    def to_dict(self):
        user_dict = {
            u"id": self.id,
            u"first_name": self.first_name,
            u"last": self.last_name,
            u"email": self.email,
            u"password": self.password,
            u"privilege": self.privilege,
            u"tags": self.tags,
        }
        return user_dict
