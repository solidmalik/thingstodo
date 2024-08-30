from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token
from flask_jwt_extended.exceptions import JWTExtendedException 
from app.routes import main  # Import the Blueprint from routes.py
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-string'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=3)  # Set token expiration to 30 days
jwt = JWTManager(app)

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"msg": "Your access token has expired. Please log in again."}), 401

# Custom error handler for unauthorized access
@jwt.unauthorized_loader
def unauthorized_loader_callback(error):
    return jsonify({"msg": "Missing authorization header. Please log in."}), 401

# Custom error handler for other JWT errors
@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"msg": "Invalid token. Please log in again."}), 401

# Register Blueprint
app.register_blueprint(main)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Set port to 8000
    