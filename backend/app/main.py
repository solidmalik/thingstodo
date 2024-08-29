from flask import Flask
from flask_jwt_extended import JWTManager
from app.routes import main  # Import the Blueprint from routes.py
from datetime import timedelta

# Create Flask application
app = Flask(__name__)

# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your-secret-string'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=3)  # Set token expiration to 30 days
jwt = JWTManager(app)

# Register Blueprint
app.register_blueprint(main)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Set port to 8000