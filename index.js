const express = require("express");
const { connectMongodb } = require("./connection");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const app = express();
const PORT = 8000;

connectMongodb("mongodb://127.0.0.1:27017/userDataApp-1")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/url", urlRouter);

// Global error handler
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: "Internal Server Error" });
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
