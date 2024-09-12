const express = require('express');

// Load users data from JSON file
const {connectMongodb} = require('./connection')
const userRouter = require('./routes/user')
const app = express();
const PORT = 8000;
connectMongodb('mongodb://127.0.0.1:27017/userDataApp-1?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1')
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // return res.json({msg:"hello"})
    next()
})

// Route to display user names as an HTML list
app.use('/api/users', userRouter)
// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
