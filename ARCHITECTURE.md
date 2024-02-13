# Project Architecture

This document provides a high-level overview of the architecture of the project. The project is divided into two main parts: the client and the server.

## Client

The client is a React application built with TypeScript and bundled with Vite. The source code for the client is located in the `client/` directory.

- `App.tsx`: This is the main entry point of the application.
- `components/`: This directory contains all the React components used in the application.
- `components/common/`: This directory contains common React components used in different components of the application.
- `constants/`: This directory contains any constant values or configuration used across the application.
- `index.html`: This is the main HTML file that includes the bundled JavaScript file and sets up the application.
- `App.css`: This file contains global styles for the application.
- `tailwind.config.js`: This file contains configuration for Tailwind CSS, a utility-first CSS framework used in the project.
- `vite.config.ts`: This file contains configuration for Vite, the build tool used for the project.
- `tsconfig.json`: This file configures TypeScript compiler options such as the root directory, output directory, ECMAScript target version, module system, and other settings.
  

## Server

The server is a Node.js application built with TypeScript and Express for handling HTTP requests. It uses MongoDB as its database for storing and retrieving data. The source code for the server is located in the `server/` directory.

- `app.ts`: This is the main entry point of the server.
- `controllers/`: This directory contains the controller functions for handling HTTP requests.
- `models/`: This directory contains the data models used in the application.
- `routes/`: This directory contains the routing information for the server.
- `utils/`: This directory contains utility functions used across the application.
- `db/`: This directory contains files related to database configuration and connection.
- `openapi.json`: This file contains the OpenAPI (Swagger) specification for the API.

## Shared

Some configuration and utility files are shared between the client and the server:

- `.prettierignore` and `.prettierrc`: These files contain configuration for Prettier, the code formatter used in the project.
- `package.json`: This file contains the list of project dependencies and scripts.

## Testing

Both the client and the server have Jest configured for testing, with the configuration located in `jest.config.mjs` (client) and `jest.config.ts` (server).

## Documentation

- `README.md`: Provides an overview of the project and instructions for setting up and running the project.
- `ARCHITECTURE.md`: (this file) Provides a high-level overview of the project's architecture.
