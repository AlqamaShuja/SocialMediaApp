const route = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");



route.get("/users/me", auth, (req, res) => {
    return res.render("index", {
        name: req.user.name,
        email: req.user.email
    });
    // res.send("Hello")
}, (error, req, res, next) => {
    res.redirect("/users/login");
});

// Get User by Id
route.get("/users/find/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ error: "User not fount" });
        res.status(200).send(user);
    } catch (error) {

    }
})

route.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const message = encodeURIComponent("Account has been created");
        res.redirect("/users/signup?message=" + message);
        // res.render("signUp", {
        //     message: "Account has been created"
        // });
        // res.status(201).send(user);
    } catch (error) {
        // res.send({ error: "Something went wrong, please provide valid details" });
        if ((error.keyPattern && error.keyPattern.email == 1) && (error.keyValue && error.keyValue.email !== "")) {
            // return res.status(400).send({ error: "Email Already exists" });
            return res.render("signUp", {
                error: "Email already exist."
            });
        }
        else if (error._message) {
            // return res.status(400).send({ error: error._message });
            return res.render("signUp", {
                // error: error._message
                error: "Please fill valid data"
            });
        }
        // res.send(error);
        res.render("signUp", {
            error
        });
    }
});

route.patch("/users/me", auth, async (req, res) => {
    console.log(req.body);
    const updateValue = Object.keys(req.body);
    const allowUpdate = ["name", "email", "password", "gender"];
    const isValidUpdate = updateValue.every(key => allowUpdate.includes(key));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Update" });
    }
    try {
        updateValue.forEach(key => req.user[key] = req.body[key]);
        await req.user.save();
        // res.send(req.user);
        res.redirect("/users/me");
    } catch (error) {
        res.status(400).send(error);
    }
});

route.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        const token = await user.generateAuthToken();
        if (!token) {
            return res.status(500).send({ error: "Can't Login at this time" });
        }
        // res.status(200).send({ user, token });
        res.cookie("token", token);
        res.redirect("/users/me");
    } catch (error) {
        // return res.status(404).send({ error: "Credentials does not match" });
        // res.redirect("/users/login");
        res.render("login", {
            error: error
        });
    }
});

route.get("/users/logout", auth, (req, res) => {
    res.clearCookie("token");
    req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token != req.token);
    res.redirect("/users/login");
});

route.get("/users/logoutAll", auth, (req, res) => {
    res.clearCookie("token");
    req.user.tokens = [];
    res.redirect("/users/login");
});


// HBS

route.get("/users/signup", (req, res) => {
    message = req.query.message ? req.query.message : "";
    res.render("signUp", {
        message
    });
})

route.get("/users/login", (req, res) => {
    res.render("login");
});

route.get("/users/update", auth, (req, res) => {
    res.render("userUpdate", {
        name: req.user.name,
        email: req.user.email,
        // gender: req.user.gender
        male: req.user.gender == 1 ? true : false,
        female: req.user.gender == -1 ? true : false,
        other: req.user.gender == 0 ? true : false,
    });
})



module.exports = route;



