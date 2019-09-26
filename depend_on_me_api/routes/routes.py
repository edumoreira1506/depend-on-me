from flask import Flask, request, redirect, render_template, url_for
from flask_login import LoginManager, login_required
from depend_on_me_api.objs import User
from collections import namedtuple
import json

backend = Flask(__name__, static_url_path='', static_folder='../../website/static/', template_folder="../../website/static/")
login_manager = LoginManager()


@backend.route("/")
def root():
    return "200 OK"


@backend.route("/create_account", methods=['POST'])
def create_account(user: User):
    potential_user = User(id=request.json["request_username"], password=request.json["request_password"], email=request.json["request_email"],
             first_name=request.json["request_first_name"], last_name=request.json["request_last_name"])
    #Do something with user
    return "200 OK"


@backend.route("/login", methods=['POST'])
def login():
    # Validate

    #Redirect to another page
    return redirect(url_for("index"))

@backend.route("/index", methods=['GET'])
def index():
    return render_template('index.html')

@login_manager.user_loader
def load_user(user_id):
    return User("", "", "", "", "", 0)




if __name__ == "__main__":
    login_manager.init_app(backend)
    backend.run(debug=True)
