const route = require("express").Router();
const User = require("../models/user");


route.get("/", (req, res) => {
    res.render("index");
});

route.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        // res.send({ error: "Something went wrong, please provide valid details" });
        if((error.keyPattern && error.keyPattern.email == 1) && (error.keyValue && error.keyValue.email !=="")){
            return res.status(400).send({ error: "Email Already exists" });
        }
        else if(error._message) {
            return res.status(400).send({ error: error._message})
        }
        res.send(error);
    }
});

route.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user){
            return res.status(404).send({ error: "User not found" });
        }
        const token = await user.generateAuthToken();
        console.log(user);
        console.log(token);
        if(!token){
            return res.status(500).send({ error: "Can't Login at this time" });
        }
        res.status(200).send({ user, token });
    } catch (error) {
        return res.status(404).send({ error: "Credentials does not match" });
    }
});




module.exports = route;



