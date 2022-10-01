const mongoose = require("mongoose");

mongoose.connect(process.env.dbURL).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log("Database is not connected");
});