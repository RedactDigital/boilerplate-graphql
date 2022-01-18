# Graphql Express Sequelize Passport MySQL

## Installation

### Method 1:

1. Clone the repository
2. Install dependencies `npm install`
3. Create environment file `npm run env`
4. Create secure keys `npm run make:keys`
5. Run server `npm start`

### Method 2: (Not fully implemented yet)

1. Clone the repository
2. Run docker-compose `docker-compose up`

_Note: If you are using docker-compose, you can run the server with `docker-compose up -d` to start the server in the background and `docker-compose down` to stop the server._

**Important: If you are using docker-compose, you need to run docker-compose in the root directory of the project.**

<!-- TODO Create command to set server up with one command -->

### Query

```
query {
  getAllUsers {
    lastName,
    password
  }
}
```

### Mutation

```
mutation {
  createUser(firstName: "patrick", lastName: "rizzardi") {
    firstName // This is the data you want returned
  }
}
```
