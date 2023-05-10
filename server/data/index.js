import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p11.jpeg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p3.jpeg",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picture: "p1.jpeg",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p6.jpeg",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p5.jpeg",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p7.jpeg",
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Carly",
    lastName: "Vowel",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p8.jpeg",
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picture: "p9.jpeg",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];
export const savedRecipes = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    recipeId: [663971, 640685, 640730]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    recipeId: [716202, 803364, 633841]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    recipeId: [650654, 659109, 632790]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    recipeId: [657226,654935, 633068]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    recipeId: [157375, 644643, 652134]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    recipeId: [658579, 663383, 636080]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    recipeId: [641970, 643091, 642701]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    recipeId: [639749, 663553, 795749, 636400]
  },
]