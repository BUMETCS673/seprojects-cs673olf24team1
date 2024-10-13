# Backup API placeholder if Fast Api fails

import requests  # Importing the requests library for making HTTP requests
from flask import Flask, jsonify  # Importing Flask framework and jsonify for JSON responses

# Initialize the Flask application
app = Flask(__name__)

def get_external_data():
    """
    Fetch external data from a placeholder API.

    This function makes a GET request to the JSONPlaceholder API to retrieve posts.

    Returns:
        list: A list of posts retrieved from the external API.

    Raises:
        Exception: If the request to the external API fails.
    """
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/posts')  # Make a GET request to the API
        response.raise_for_status()  # Raise an error for HTTP error responses
    except requests.exceptions.RequestException as e:
        # Error handling for request failures
        raise Exception(f"Error fetching external data: {str(e)}")  # Return a specific error message

    return response.json()  # Return the JSON data from the response


def transform_data(data):
    """
    Transform the external data into a specific format.

    This function takes a list of posts and transforms it by converting titles to uppercase.

    Args:
        data (list): A list of posts to transform.

    Returns:
        list: A list of transformed posts with IDs and uppercase titles.
    """
    # Requirement Condition: Ensure the data is a list before transformation
    if not isinstance(data, list):
        raise ValueError("Input data must be a list.")  # Raise an error if data is not a list

    # Transform the data by changing titles to uppercase
    transformed_data = [{"id": post["id"], "title": post["title"].upper()} for post in data]
    return transformed_data  # Return the transformed data


@app.route('/')
def hello_world():
    """
    A simple hello world route.

    Returns:
        str: A greeting message.
    """
    return 'Hello, World!'  # Return a greeting message


@app.route('/posts')
def get_posts():
    """
    Endpoint to retrieve and transform posts from an external API.

    This route fetches posts from an external API, transforms the data, and returns it as a JSON response.

    Returns:
        JSON response containing transformed post data.

    Raises:
        HTTPException: If there is an error fetching or transforming the data.
    """
    try:
        external_data = get_external_data()  # Fetch external data
        transformed_data = transform_data(external_data)  # Transform the fetched data
        return jsonify(transformed_data)  # Return the transformed data as JSON
    except Exception as e:
        # Error handling for any exceptions raised during data fetching or transformation
        return jsonify({"success": False, "message": str(e)}), 500  # Return error message in JSON format


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9080)  # Run the Flask application on the specified host and port
