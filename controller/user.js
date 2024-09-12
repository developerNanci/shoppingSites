const User = require("../models/user");

async function handleGetAllUser(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

// Update a user by ID
async function handleUpdateUser(req, res) {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({ msg: "User updated successfully", user: updatedUser });
}

async function handleDeleteUser(req, res) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({ msg: "User deleted successfully" });
}

async function handleCreateNewUser(req, res) {
  const { first_name, last_name, email, gender, job_title } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  // Attempt to create the user
  const result = await User.create({
    firstName: first_name,
    lastName: last_name,
    email,
    jobTitle: job_title,
    gender,
  }).catch((err) =>
    res.status(400).json({ msg: "User creation failed", error: err.message })
  );
  // Handle case when result is undefined or null
  if (!result) return;
  const plainResult = result.toObject ? result.toObject() : result;
  // Return success if no errors
  return res.status(201).json({ msg: "Success", user: plainResult });
}

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleCreateNewUser,
};
