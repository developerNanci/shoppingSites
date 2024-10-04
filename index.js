const express = require("express");
const { connectMongodb } = require("./connection");
const path = require('path')
const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/newUser');

connectMongodb("mongodb://127.0.0.1:27017/userDataApp-1");

app.set('view engine', "ejs")
app.set('views', path.resolve('./views'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/api/users", userRouter);
app.use("/user", userRoute);
app.use("/url", urlRouter);
app.use("/", staticRoute);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
