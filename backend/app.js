const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const pictureRouter = require("./routes/picture");

const userValidation = require("./middlewares/validations/userValidation");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userValidation, userRouter);
app.use("/products", productRouter);
app.use("/pictures", pictureRouter);

module.exports = app;
