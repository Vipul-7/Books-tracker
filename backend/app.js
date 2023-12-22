const express = require("express");
const http = require("http");


// const { createHandler } = require("graphql-http");
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const typeDefs = require("./graphql/typeDefs");
const graphqlResolvers = require("./graphql/resolvers");
const authRoutes = require("./routes/auth")
const auth = require("./middleware/auth");

const app = express();
const httpServer = http.createServer(app);

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

const graphqlApi = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: graphqlResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError(err) {
      const data = err.data;
      const message = err.message || "An error occurred";
      const code = err.extensions.code || 500;
      return { message, status: code, data };
    }
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server, {
    context: ({ req }) => {
      return {
        isAuth: req.isAuth,
        userId: req.userId
      }
    }
  }));
}

const startServer = async () => {
  await graphqlApi();

  app.use((error, req, res, next) => {
    console.log(error)
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data })
  })

  httpServer.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
}

startServer();