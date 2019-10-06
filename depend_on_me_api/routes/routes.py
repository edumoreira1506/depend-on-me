from flask import Flask, request
from flask_api import status
from flask_login import LoginManager
from depend_on_me_api.objs import User
from google.cloud import firestore

# initalize
backend = Flask(
    __name__,
    static_url_path="",
    static_folder="../../website/public/",
    template_folder="../../website/static/public/",
)
login_manager = LoginManager()
db = firestore.Client()


@backend.route("/", methods=["GET"])
def default():
    return "", status.HTTP_200_OK


@backend.route("/create_account", methods=["POST"])
def create_account():
    potential_user = User.from_request(request)

    # Check if user name exists
    if db.collection(u"users").document(potential_user.id).get().exists:
        return "", status.HTTP_409_CONFLICT

    doc_ref = db.collection(u"users").document(potential_user.id)
    doc_ref.set(potential_user.to_dict())

    return "", status.HTTP_200_OK


@backend.route("/login", methods=["POST"])
def login():
    return "200 OK"


@login_manager.user_loader
def load_user(user_id):
    return User("", "", "", "", "", 0)


if __name__ == "__main__":
    login_manager.init_app(backend)
    backend.run(debug=True)
