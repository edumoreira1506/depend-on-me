from flask import Flask, request, jsonify
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


def convert_input_to(class_):
    def wrap(f):
        def decorator(*args):
            obj = class_.from_request(request)
            return f(obj)

        return decorator

    return wrap


@backend.route("/", methods=["GET"])
def default():
    return jsonify("")


@backend.route("/create_account", methods=["POST"])
@convert_input_to(User)
def create_account(potential_user: User):

    # Check if user name exists
    if db.collection(u"users").document(potential_user.id).get().exists:
        return "", status.HTTP_409_CONFLICT

    doc_ref = db.collection(u"users").document(potential_user.id)
    doc_ref.set(potential_user.to_dict())

    return jsonify("")


@backend.route("/login", methods=["POST"])
def login():
    return jsonify(True)


@login_manager.user_loader
def load_user(user_id):
    return User("", "", "", "", "", 0)


if __name__ == "__main__":
    login_manager.init_app(backend)
    backend.run(debug=True)
