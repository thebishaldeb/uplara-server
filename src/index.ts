import { ApolloServer } from "apollo-server";
import schema from "./graphql/schemasMap";
import config from "./config";

const PORT: number = config.SERVER_PORT;

const server = new ApolloServer({
  schema,
  introspection: true,
  context: ({ req }) => req,
});

server.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
