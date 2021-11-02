import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

// -Scalar Types-
// String
// Boolean
// Int
// Float
// ID - used to represent unique indentifiers

// Dummy Data

const users = [
  { id: "1", name: "Matt", email: "matt@gmail.com", age: 34 },
  { id: "2", name: "Danelle", email: "danelle@gmail.com", age: 36 },
  { id: "3", name: "Kali", email: "kali@gmail.com" },
];

const posts = [
  {
    id: "10",
    title: "GraphQl Course",
    body: "This is an awesome course",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "Node Course",
    body: "This is a tut on nodejs",
    published: true,
    author: "1",
  },
  {
    id: "12",
    title: "React Course",
    body: "This is the best library",
    published: false,
    author: "2",
  },
];

const comments = [
  { id: "21", text: "This is the first comment", author: "1", post: "10" },
  { id: "22", text: "This is the second comment", author: "2", post: "10" },
  { id: "23", text: "This is the third comment", author: "2", post: "11" },
  { id: "24", text: "This is the fourth comment", author: "1", post: "12" },
];

// type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      } else {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      } else {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      }
    },
    comments(parent, args, context, info) {
      return comments;
    },
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
  Mutation: {
    createUser(parent, args, context, info) {
      const emailTaken = users.some((user) => user.email === args.email);
      if (emailTaken) {
        throw new Error("Email is already in use.");
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, context, info) {
      const userExists = users.some((user) => user.id === args.author);
      if (!userExists) {
        throw new Error("User not found!");
      }
      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, context, info) {
      const userExists = users.some((user) => user.id === args.author);
      const postsExists =
        posts.some((post) => post.id === args.post) && post.published === true;
      if (!userExists) {
        throw new Error("User not found");
      } else if (!postsExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, context, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, context, info) {
      return posts.find((post) => post.id === parent.post);
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
