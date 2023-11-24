const express = require("express");

const app = express();

// const { createHandler } = require("graphql-http");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const authRoutes = require("./routes/auth")
const auth = require("./middleware/auth");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/auth", authRoutes);
app.use(auth);

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

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});