const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const {
  getAllUsers,
  getUser,
  createUser,
  updatUser,
  deleteUser,

 
} = require("../controllers/userController");
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/:id", updatUser);
router.delete("/:id", deleteUser);

module.exports = router;
