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

        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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
    post() {
      return {
        id: "123dfg",
        title: "GraphQL Course",
        body: "This is a course on learning GQL",
        published: true,
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
