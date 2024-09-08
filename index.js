const express = require('express');
const fs = require('fs');
const path = require('path');

// Load users data from JSON file
const usersFilePath = path.join(__dirname, 'MOCK_DATA.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    return res.json({msg:"hello"})
})

// Route to display user names as an HTML list
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

// Route to get all users in JSON format
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// Route to create a new user (currently logs the request body)
app.post('/api/users', (req, res) => {
    console.log(req.body, "body"); // Log the request body
    return res.json("status: pending"); // Placeholder response
});

// Route for operations on a single user by ID
app.route('/api/users/:id')
  // Get user by ID
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  })
  
  // Update (patch) user by ID
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return res.json({ status: "User updated", user: users[userIndex] });
  })
  
  // Delete user by ID
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
    users.splice(userIndex, 1);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return res.json({ status: "User deleted" });
  });

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
