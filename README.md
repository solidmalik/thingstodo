## ThingsToDo Project

Welcome to the **ThingsToDo** project! This repository contains a task management application with a Vue.js frontend and a Flask backend. Follow the instructions below to set up and run both the frontend and backend locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later) and **npm** (v6 or later) or **Bun** (v0.1.0 or later)
- **Python** (v3.8 or later)
- **pip** (Python package manager)
- **pipenv** (Python environment and dependency manager)

### Backend Setup (Flask)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/thingstodo.git
   cd thingstodo
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

3. **Create a Virtual Environment and Activate It**:
   ```bash
   pip install pipenv
   pipenv install
   pipenv shell
   ```

4. **Install Backend Dependencies**:
   ```bash
   pipenv install
   ```

5. **Set Environment Variables**:
   Ensure you have the required environment variables set. Create a `.env` file in the backend directory and add the following:
   ```bash
   FLASK_APP=app.main:app
   FLASK_ENV=development
   ```

6. **Run the Flask Backend**:
   ```bash
   flask run --host=127.0.0.1 --port=8000
   ```
   The backend will now be running on `http://127.0.0.1:8000`.

### Frontend Setup (Vue.js)

1. **Navigate to the Frontend Directory**:
   Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. **Install Bun (if not installed)**:
   If you prefer using Bun, you can install it via the following:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

   Otherwise, ensure `Node.js` and `npm` are installed.

3. **Install Frontend Dependencies**:
   If using **Bun**:
   ```bash
   bun install
   ```

   Or, if using **npm**:
   ```bash
   npm install
   ```

4. **Run the Frontend in Development Mode**:
   If using **Bun**:
   ```bash
   bun run dev
   ```

   Or, if using **npm**:
   ```bash
   npm run dev
   ```
   The frontend will now be running on `http://127.0.0.1:5000`.

### Running Both in Parallel

To run both the backend and frontend in parallel, you should have two terminal windows/tabs open:

- **Terminal 1**: Running the **Flask backend** (`flask run --host=127.0.0.1 --port=8000`)
- **Terminal 2**: Running the **Vue.js frontend** (`bun run dev` or `npm run dev`)

### Proxy Configuration

The frontend is set up with a proxy to redirect API calls to the Flask backend. Ensure your proxy settings in `vite.config.ts` are correct:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000', // Proxy API requests to the backend
    },
  },
});
```

### Building the Frontend for Production

If you want to build the frontend for production, run:

```bash
bun run build  # if using Bun
```

or

```bash
npm run build  # if using npm
```

### Notes

- **Ensure both servers are running**: The frontend will not function correctly if the backend is not running and vice versa.
- **Environment Variables**: Always ensure your environment variables are set correctly in both development and production environments.

### Troubleshooting

- **Common Issues**:
  - If you encounter issues with missing modules, try running `bun install` or `npm install` again.
  - Ensure your Python environment is activated before running `flask` commands.
  - Check for any typos in environment variables.

### Contributing

Feel free to fork this repository and submit pull requests. Contributions are always welcome!

### License

This project is licensed under the MIT License.

---

This README should help users set up and run your project locally without Docker. Adjust paths, repository URLs, and any specific instructions according to your project's needs.