const express = require("express");

const app = express();

// const { createHandler } = require("graphql-http");
const { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const { formatError } = require("graphql");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    id: 1,
  };

  next();
});


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }

      const data = err.originalError.data;
      const message = err.message || "An Error occured";
      const code = err.originalError.code || 500;
      return {
        message,
        status: code,
        data
      }
    }
  }),
);

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.code || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});