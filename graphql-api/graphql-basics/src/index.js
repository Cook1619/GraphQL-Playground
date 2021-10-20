import { GraphQLServer } from "graphql-yoga";

// type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return `Hello from GQL!!!`;
    },
    name() {
      return `Hello, this is matt!`;
    },
    location() {
      return `I'm located in Mayer, MN`;
    },
    bio() {
      return `I enjoy family time and the outdoors`;
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
