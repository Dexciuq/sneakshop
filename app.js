const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require("path");

const keys = require("./config/keys");
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("err"));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use("/", require("./routes/root"));
app.use("/about", require("./routes/about"));
app.use("/products", require("./routes/products"));
app.use("/contact", require("./routes/contact"));
app.use("/cart", require("./routes/cart"));
app.use("/profile", require("./routes/profile"));
app.use("/", require("./routes/auth"));


module.exports = app;