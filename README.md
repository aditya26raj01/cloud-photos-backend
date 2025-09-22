# Cloud Photos Backend

A simple Node.js Express backend with Docker support that provides a health check endpoint.

## Features

- ✅ Health check endpoint
- ✅ Docker containerization
- ✅ Docker Compose for easy development
- ✅ Environment configuration
- ✅ Security best practices

## Quick Start

### Using Docker (Recommended)

1. **Clone and navigate to the project:**

   ```bash
   cd cloud-photos-backend
   ```

2. **Build and run with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

3. **Test the health endpoint:**
   ```bash
   curl http://localhost:3000/health
   ```

### Using Node.js directly

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   npm start
   ```

3. **For development with auto-reload:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check

- **GET** `/health` - Returns server health status

**Response:**

```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Environment Variables

Copy `env.example` to `.env` and configure as needed:

```bash
cp env.example .env
```

Available variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Docker Commands

```bash
# Build the image
docker build -t cloud-photos-backend .

# Run the container
docker run -p 3000:3000 cloud-photos-backend

# Run with Docker Compose
docker-compose up

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## Project Structure

```
cloud-photos-backend/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── .gitignore          # Git ignore rules
├── env.example         # Environment variables template
└── README.md           # This file
```

## Development

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable.

Health check endpoint is available at: `http://localhost:3000/health`
