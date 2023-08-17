const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Call authMiddleware to attach user data to req
      authMiddleware(req, null, () => {});

      // Return the context object with the updated req
      return { req };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // Middleware for handling form data and JSON data
  // Make sure this middleware setup comes after Apollo Server middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  // Connect to the database
  db.once("open", () => {
    console.log("Connected to the database");
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();

//Checkpoint!!
