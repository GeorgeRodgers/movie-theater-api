// Import application server and database
const {app} = require(`./src/app`)
const {db} = require("./db/connection");
const port = 3000; // assigns a port for the server

// Initializes the server
app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/`);
});