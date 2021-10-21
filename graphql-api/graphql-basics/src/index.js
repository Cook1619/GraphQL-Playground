import { GraphQLServer } from "graphql-yoga";

// -Scalar Types-
// String
// Boolean
// Int
// Float
// ID - used to represent unique indentifiers

// type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "123asd",
        name: "Matt",
        email: "cook3465@gmail.com",
        age: 34,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log(`Server is running!`);
});
