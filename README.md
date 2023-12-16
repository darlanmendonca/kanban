# Kanban Example

This project exemplifies how to implement a simple API using Node, Express, Typescript, Sequelize, and others.

The database is an SQlite (in memory), including seeders for user authentication.

For environment variables, create a `.env.development` or `.env.production` and fill all variables needed. A `.env.example` is provided.

# Requirements

Node.js v18, and NPM for install all the dependencies.

```sh
# to install all dependencies
npm install
```

# Development Usage

Some scripts are available for development, like

```sh
# starts the application in development mode
npm run dev
```

```sh
# lint all files, also available on IDE if you have an eslint plugin
npm run lint
```

# Build

```sh
npm run build
```

# Production

```sh
# starts application in production mode
npm start
```

# Tests

Couldn't add tests yet.

```sh
npm test
```

### Considerations

Some specs could be improved from my perspective, and I took the opportunity to suggest them all. Here is a description of each one.

- For Card format is specified a format with Portuguese words, I believe those could be written in English, since that is mentioned in other places, like the endpoints.

- Logging is requested a middleware, however, it requires more queries to the database to get some additional data, like the title. I believe a better place for logs could be the controller since there we are already fetching the data, including the additional one, and ensuring that the log is made only for successful actions.

- I'd like to implement unit tests, however my time for implementing those during this weekend is short, so I prioritize the implementation, and maybe a client-side lately.
