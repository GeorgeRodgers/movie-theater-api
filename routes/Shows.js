const { Router } = require(`express`); // Import Router() from `express`
const { User, Show } = require(`../models/index`); // Import User and Show models from index file
const { check, validationResult } = require(`express-validator`); // Imported but not used

const showRouter = Router(); // Creates router

// GET route to get all shows
showRouter.get(`/`, async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
});

// GET route to get a shows by id or genre
showRouter.get(`/:input`, async (req, res) => {
    const show = await Show.findByPk(req.params.input); // Using the input finds the show 
    if (show != null){ // If a number is provided the show variable will not be null
        res.json(show); // responds with the found show
    } else { // If show is null move to this statment

        // The input is currently incorrectly formated to find shows by genre

        // If the input is a string it is spilt into an array at `-`
        // map through the array capitalising the first letter
        // joins the array with ` ` as a spacer

        const genre = req.params.input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        // original attempt used a loop with conditional logic, Atlas suggests the above code as a simpler method.

        //     let genre = ``;
        //     for (let i = 0; i < req.params.input.length; i++){
        //         if (i === 0) {
        //             genre += req.params.input.charAt(i).toUpperCase();
        //         } else if (req.params.input.charAt(i) === `-`) {
        //             genre += ` `;
        //         } else if (req.params.input.charAt(i - 1) === `-`){
        //             genre += req.params.input.charAt(i).toUpperCase();
        //         } else {
        //             genre += req.params.input.charAt(i);
        //         };
        //     };

        const shows = await Show.findAll({where: {genre: genre}}); // Find show using the correctly formatted input
        res.json(shows); // responds with the found shows 
    }
});

// GET route to get show with all the users that watched it
showRouter.get(`/:id/users`, async (req, res) => {
    const showWithUsers = await Show.findByPk(req.params.id, {include: {model: User}}); 
    res.json(showWithUsers);
});

// PUT route to update a shows availability
showRouter.put(`/:id/available`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    if (show.available === true) {
        await show.update({"available": false});
        res.send(`${show.title} is no longer available`); // responds with a stament about the shows availability
    } else if (show.available === false) {
        await show.update({"available": true});
        res.send(`${show.title} is now available`); // responds with a stament about the shows availability
    };
});

// DELETE route to remove a show
showRouter.delete(`/:id`, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.send(`${show.title} has been deleted`)
});

module.exports = { showRouter }