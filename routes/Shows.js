const { Router } = require(`express`);
const { User, Show } = require(`../models/index`);
const { check, validationResult } = require(`express-validator`);

const showRouter = Router();

showRouter.get(`/`, async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
});

showRouter.get(`/:id`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
});

showRouter.get(`/:id/users`, async (req, res) => {
    const showWithUsers = await Show.findByPk(req.params.id, {include: {model: User}});
    res.json(showWithUsers);
});

showRouter.put(`/:id`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    if (show.available == true) {
        show.available = false
        const updatedShow = await Show.findByPk(req.params.id);
        // res.send(`${show.title} is no longer available`)
        res.json({show, updatedShow})
    } else if (show.available == false) {
        const updatedShow = await Show.findByPk(req.params.id);
        show.available = true;
        // res.send(`${show.title} is now available`)
        res.json({show, updatedShow})
    };
});

module.exports = { showRouter }