# Graphql Express Sequelize Passport MySQL

## Installation

### Method 1:

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create secure keys

```bash
redact make-keys
```

4. Run the server

### Method 2:

1. Clone the repository
2. Run docker-compose

```bash
docker-compose up
```

Note: If you are using docker-compose, you can run the server with `docker-compose up -d` to start the server in the background and `docker-compose down` to stop the server.
Important: If you are using docker-compose, you need to run docker-compose in the root directory of the project.

<!-- TODO Create command to set server up with one command -->

## Query

```
query {
  getAllUsers {
    lastName,
    password
  }
}
```

## Mutation

```
mutation {
  createUser(firstName: "patrick", lastName: "rizzardi") {
    firstName // This is the data you want returned
  }
}
```
