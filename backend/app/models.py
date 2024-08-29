class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.tasks = []  # List to store user's tasks

    def add_task(self, task):
        self.tasks.append(task)

    def remove_task(self, task_id):
        self.tasks = [task for task in self.tasks if task['id'] != task_id]

# In-memory user storage
users_db = {}
