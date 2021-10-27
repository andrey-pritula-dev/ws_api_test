const mongoose = require("mongoose");

const initDB = () => {
    const url = process.env.DB_CONNECTION_URL;
    mongoose.connection.once("open", () => {
        console.log("> Connected to database");
    });
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch((err) => {
            console.log(err);
        });

};

module.exports = initDB;
