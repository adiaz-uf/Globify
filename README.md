# Globify - Spotify Client Clone

Globify is a modern web application that replicates the core functionality and aesthetic of a Spotify client. It is built using standard web technologies and containerized for easy deployment.

## 🚀 Features

- **Responsive Design**: Modern UI/UX resembling the Spotify web player.
- **TypeScript**: Written in TypeScript for type safety and better maintainability.
- **Dockerized**: Fully containerized setup using Docker and Nginx.
- **Development Workflow**: Integrated local development environment with hot-reloading (BrowserSync).

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, TypeScript
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (Production) / BrowserSync (Development)
- **Build Tools**: npm, tsc (TypeScript Compiler)

## 📋 Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/) (optional, for using the Makefile)
- [Node.js & npm](https://nodejs.org/) (only for local development without Docker)

## ⚡️ Quick Start

### Using Docker (Recommended)

To build and start the application in a production-like with Nginx:

```bash
make up
```
Or manually:
```bash
docker compose up -d --build
```

The application will be available at **http://localhost:8080**.

### Local Development

For a better development experience with file watching and live reloading:

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   make dev
   ```
   *Alternatively*: `cd frontend && npm run dev`

This will start compiling TypeScript in watch mode and launch BrowserSync.

## 🔧 Makefile Commands

The project includes a `Makefile` to simplify common tasks:

| Command | Description |
|---------|-------------|
| `make up` | Builds and starts the application in the background. |
| `make down` | Stops and removes the running containers. |
| `make build` | Rebuilds the Docker images without starting them. |
| `make logs` | Follows the logs of the running containers. |
| `make restart` | Restarts the application (down + up). |
| `make clean` | Stops containers and removes volumes. |
| `make fclean` | Deep clean: removes containers, volumes, and images. |
| `make dev` | Starts the local development environment (requires npm). |

## 📂 Project Structure

```
Globify/
├── frontend/           # Source code for the frontend application
│   ├── css/            # Stylesheets
│   ├── ts/             # TypeScript source files
│   ├── index.html      # Entry point
│   ├── nginx.conf      # Nginx configuration for Docker
│   └── package.json    # Dependencies and scripts workflows
├── docker-compose.yml  # Docker Compose service definition
├── Makefile            # Shortcut commands
└── README.md           # Project documentation
```
