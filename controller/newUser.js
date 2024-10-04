const newUser = require("../models/newUser");
const {v4:uuidv4} = require("uuid")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({
            error: "Invalid data. Name, email, and password are required."
        });
    }
    // Create the new user in the database
    await newUser.create({
        name, email, password,
    });
    return res.status(201).render('home');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    console.log(newUser.find({}))
    const user =  await newUser.findOne({email,password})
    console.log(user)
    if(!user) return res.status(400).render('login', {
        error : "Invalid Username and Password"
    })   
    const sessionId = uuidv4();
    return res.status(200).redirect('/');
}

module.exports = {
    handleUserSignup, handleUserLogin
};
