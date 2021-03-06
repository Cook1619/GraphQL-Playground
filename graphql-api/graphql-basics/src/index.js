import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

// -Scalar Types-
// String
// Boolean
// Int
// Float
// ID - used to represent unique indentifiers

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      } else {
        return db.users.filter((user) =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      } else {
        return db.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      }
    },
    comments(parent, args, { db }, info) {
      return db.comments;
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
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(
        (user) => user.email === args.data.email
      );
      if (emailTaken) {
        throw new Error("Email is already in use.");
      }
      const user = {
        id: uuidv4(),
        ...args.data,
      };

      db.users.push(user);

      return user;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const deletedUsers = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          db.comments = db.comments.filter(
            (comment) => comment.post !== post.id
          );
        }
        return !match;
      });
      db.comments = db.comments.filter((comment) => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error("User not found!");
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      };

      db.posts.push(post);

      return post;
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }
      const deletedPosts = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter((comment) => comment.post !== args.id);
      return deletedPosts[0];
    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      const postsExists = db.posts.some(
        (post) => post.id === args.data.post && post.published
      );
      if (!userExists) {
        throw new Error("User not found");
      } else if (!postsExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      db.comments.push(comment);

      return comment;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }
      const deletedComment = db.comments.splice(commentIndex, 1);

      return deletedComment[0];
    },
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
  },
});

server.start(() => {
  console.log(`Server is running!`);
});
