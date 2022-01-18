# Graphql Express Sequelize Passport MySQL

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
