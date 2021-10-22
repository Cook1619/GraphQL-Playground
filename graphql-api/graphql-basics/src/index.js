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
        greeting(name: String): String!
        add(numbers: [Float!]): Float!
        me: User!
        post: Post!
        grades: [Int]!
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
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}!`;
      } else {
        return "Hello!";
      }
    },
    add(parent, args) {
      if (args.numbers.length) {
        return args.numbers.reduce((a, b) => a + b);
      } else {
        return 0;
      }
    },
    grades(parent, args, ctx, info) {
      return [10, 55, 67, 89, 99];
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
