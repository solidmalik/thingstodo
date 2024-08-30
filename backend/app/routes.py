# app/routes.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from app.models import User, users_db

# Create a Blueprint for the routes
main = Blueprint('main', __name__)

# Helper function to get a user by username
def get_user(username):
    return users_db.get(username)

# Authentication routes
@main.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    
    if username in users_db:
        return jsonify({"msg": "User already exists"}), 400
    
    users_db[username] = User(username, password)
    return jsonify({"msg": "User created successfully"}), 201

@main.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = get_user(username)
    if user and user.password == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401



@main.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    current_user = get_user(get_jwt_identity())
    if current_user:
        return jsonify(current_user.tasks), 200
    else:
        return jsonify({"msg": "no user logged in"}), 401

@main.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    task_data = request.json
    if not task_data or 'title' not in task_data:
        return jsonify({"msg": "Missing task data"}), 400
    
    current_user = get_user(get_jwt_identity())
    task_id = len(current_user.tasks) + 1
    task = {'id': task_id, **task_data}
    current_user.add_task(task)
    return jsonify(task), 201

@main.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    current_user = get_user(get_jwt_identity())
    if not any(task['id'] == task_id for task in current_user.tasks):
        return jsonify({"msg": "Task not found"}), 404
    
    current_user.remove_task(task_id)
    return jsonify({"msg": "Task deleted"}), 200

@main.route('/')
def home():
    return jsonify({"msg": "Hello There"})