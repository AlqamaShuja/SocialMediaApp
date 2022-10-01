require("./db/mongoose");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");


const app = express();
const userRoute = require("./Router/user");
const pathToPublic = path.join(__dirname, "../public");


// handlebar setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views"));
hbs.registerPartials(path.join(__dirname, "../template/partials"));

// Middleware
app.use(express.static(pathToPublic));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes Middleware
app.use(userRoute);





const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});