// Imports express and creates express server
const express = require("express");
const app = express();

// Imports routers
const { userRouter } = require(`../routes/Users`);
const { showRouter } = require(`../routes/Shows`);

// Middleware for server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/users`, userRouter);
app.use(`/shows`, showRouter);

module.exports = {app};