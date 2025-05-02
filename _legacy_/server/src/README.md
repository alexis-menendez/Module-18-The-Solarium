# Legacy Server Code

This folder contains the original RESTful API implementation of the server-side logic for the Book Search Engine application. It includes:

- Express route handlers in `routes/`
- A user controller in `controllers/`

## Purpose

This code was originally used to handle user authentication and book-saving functionality through RESTful endpoints. However, it has been deprecated in favor of a GraphQL API powered by Apollo Server.

The new implementation lives in the `server/src/schemas/` directory and supports:

- GraphQL queries and mutations
- Apollo middleware integration
- Token-based authentication in GraphQL context

## Why Keep This?

This legacy code is preserved for reference only. It may be helpful for:
- Comparing REST and GraphQL architectures
- Reviewing controller logic now handled by GraphQL resolvers
- Understanding the evolution of the backend structure

## Important

This code is **not used** in the current application and should not be imported or executed. All new features and updates should be made using the GraphQL schema and resolvers.

