# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock to the working directory
COPY Pipfile Pipfile.lock /app/

# Install Python dependencies using pipenv
RUN pipenv install --system --deploy

# Copy the rest of the application code into the container
COPY . /app

# Expose port 8000 for the Flask app
EXPOSE 8000

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]
