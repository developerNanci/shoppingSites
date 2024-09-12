const express = require("express");
const {
  handleGetAllUser,
  handleUpdateUser,
  handleGetUserById,
  handleDeleteUser,
  handleCreateNewUser,
} = require("../controller/user");
const router = express.Router();

// Route to get all users in JSON format

router.route("/").get(handleGetAllUser).post(handleCreateNewUser);
// Route to create a new user (currently logs the request body)
router
  .route("/:id")
  // Get user by ID
  .get(handleGetUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
