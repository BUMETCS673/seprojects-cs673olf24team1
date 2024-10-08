# Eagles Frontend

This is the frontend for the **Eagles** project, built using React and Vite. The frontend interacts with the backend services and AI API to deliver a seamless experience.

# React + Vite

- ** This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

   - Currently, two official plugins are available:

   - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
   - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Project Structure

- **Frontend:** React + Vite
- **Backend:** Java (Spring Boot)
- **AI Model:** Integrated with Llama 2 via Hugging Face API
- **Databases:**
  - MongoDB (course/program data, AI recommendations)
  - PostgreSQL (chat history)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Docker Desktop** (for running Docker containers)

## Getting Started

### Clone the repository

```bash
git clone <your-repository-url>
cd frontend/Eagles
```

### Install dependencies

Make sure to install the necessary npm packages:

```bash
npm install
```

### Run the app locally

To run the app on your local machine:

```bash
npm run dev
```

This will start the development server. Visit `http://localhost:3000` to view the app.

### Build the app for production

To build the project for production:

```bash
npm run build
```

The build files will be output to the `dist/` directory.

## Docker Setup

### Build and run the Docker image

If you prefer to run the app in a Docker container, follow these steps:

1. **Build the Docker image**:

   ```bash
   docker build -t eagles-frontend .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 3000:3000 eagles-frontend
   ```

   The app should now be accessible at `http://localhost:3000`.

## Environment Variables

The following environment variables can be configured for the frontend:

- VITE_API_URL=http://localhost:8080



## Troubleshooting

- **Docker issues**: Make sure Docker Desktop is running before executing any Docker commands.
- **Ports conflict**: Ensure port 3000 is available, or modify the `docker run` command to map the app to a different port.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
