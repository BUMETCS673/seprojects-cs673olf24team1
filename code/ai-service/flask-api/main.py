import requests
from flask import Flask, jsonify

app = Flask(__name__)

def get_external_data():
    response = requests.get('https://jsonplaceholder.typicode.com/posts')
    return response.json()

def transform_data(data):
    transformed_data = [{"id": post["id"], "title": post["title"].upper()} for post in data]
    return transformed_data

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/posts')
def get_posts():
    external_data = get_external_data()
    transformed_data = transform_data(external_data)
    return jsonify(transformed_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9080)