const express = require("express");

const app = express();

const { createHandler } = require("graphql-http");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

app.use(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
  })
);