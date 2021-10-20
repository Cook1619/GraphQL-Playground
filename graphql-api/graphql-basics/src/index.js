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

        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    title() {
      return "Divide";
    },
    price() {
      return 19.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 10;
    },
    inStock() {
      return true;
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
