from flask import Flask

backend = Flask(__name__)


@backend.route("/")
def hello():
    return "200 OK"


if __name__ == "__main__":
    backend.run(debug=True)
