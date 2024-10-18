const { express, Router } = require(`express`);
const { User, Show } = require(`../models/index`);
const { check, validationResult } = require(`express-validator`);

const userRouter = Router();

userRouter.get(`/`, async (req, res) => {
    const users = await User.findAll({});
    res.json(users);
});

userRouter.get(`/:id`, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

userRouter.get(`/:id/shows`, async (req, res) => {
    const user = await User.findByPk(req.params.id, {include: {model: Show}});
    res.json(user);
});

userRouter.put(`/:userid/shows/:showid`, async (req, res) => {
    const user = await User.findByPk(req.params.userid); 
    const show = await Show.findByPk(req.params.showid);
    await user.addShow(show);
    const updatedUser = await User.findByPk(req.params.userid, {include: {model: Show}});
    res.json(updatedUser);
});

module.exports = {userRouter};