const newUser = require("../models/newUser");

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;
    await newUser.Create({
        name, email, password,
    })
    return res.render('home')
}

module.exports = {
    handleUserSignup
}