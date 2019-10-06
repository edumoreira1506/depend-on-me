import pytest
from depend_on_me_api.routes.routes import backend


@pytest.fixture
def client():
    client = backend.test_client()
    yield client


def test_hello_world(client):
    resp = client.get("/")
    assert resp.status == "200 OK"
