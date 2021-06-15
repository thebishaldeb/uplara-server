import { ApolloServer } from "apollo-server";
import schema from "./graphql/schemasMap";
require("dotenv").config();

const server = new ApolloServer({
  schema,
  introspection: true,
  context: ({ req }) => req,
});

server.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
