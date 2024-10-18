const { Router } = require(`express`);
const { User, Show } = require(`../models/index`);
const { check, validationResult } = require(`express-validator`);

const showRouter = Router();

showRouter.get(`/`, async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
});

showRouter.get(`/:input`, async (req, res) => {
    const show = await Show.findByPk(req.params.input);
    if (show === null){
        let genre = ``;
        for (let i = 0; i < req.params.input.length; i++){
            if (i === 0) {
                genre += req.params.input.charAt(i).toUpperCase();
            } else if (req.params.input.charAt(i) === `-`) {
                genre += ` `;
            } else if (req.params.input.charAt(i - 1) === `-`){
                genre += req.params.input.charAt(i).toUpperCase();
            } else {
                genre += req.params.input.charAt(i);
            };
        };
        const shows = await Show.findAll({where: {genre: genre}});
        res.json(shows);
    } else {
        res.json(show);   
    }
});

showRouter.get(`/:id/users`, async (req, res) => {
    const showWithUsers = await Show.findByPk(req.params.id, {include: {model: User}});
    res.json(showWithUsers);
});

showRouter.put(`/:id/available`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    if (show.available === true) {
        await show.update({"available": false});
        res.send(`${show.title} is no longer available`);
    } else if (show.available === false) {
        await show.update({"available": true});
        res.send(`${show.title} is now available`);

    };
});

showRouter.delete(`/:id`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.send(`${show.title} has been deleted`)
});

module.exports = { showRouter }