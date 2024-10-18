const { express, Router } = require(`express`);
const { User, Show } = require(`../models/index`);
const { check, validationResult } = require(`express-validator`);

const userRouter = Router();

// GET route to get all users
userRouter.get(`/`, async (req, res) => {
    const users = await User.findAll({});
    res.json(users);
});

// GET route to get a user by id
userRouter.get(`/:id`, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

// GET route to get a user by id with shows watched
userRouter.get(`/:id/shows`, async (req, res) => {
    const userWithShows = await User.findByPk(req.params.id, {include: {model: Show}});
    res.json(userWithShows);
});

// PUT route to add a show to a user
userRouter.put(`/:userid/shows/:showid`, async (req, res) => {
    const user = await User.findByPk(req.params.userid); 
    const show = await Show.findByPk(req.params.showid);
    await user.addShow(show);
    const updatedUser = await User.findByPk(req.params.userid, {include: {model: Show}});
    res.json(updatedUser);
});

module.exports = { userRouter };