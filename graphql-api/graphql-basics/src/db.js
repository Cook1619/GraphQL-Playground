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

export const db = {
  users,
  posts,
  comments,
};
