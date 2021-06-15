import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schemasMap";
import config from "./config";

const PORT: number = config.SERVER_PORT;

const app = express();
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app, path: "/" });

app.listen(PORT, () => {
  console.log(`\nGraphql is now running on http://localhost:${PORT}/graphql`);
});
