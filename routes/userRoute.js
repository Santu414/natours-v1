const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authController");
const {
  getAllUsers,
  getUser,
  createUser,
  updatUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require("../controllers/userController");
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", authController.protect, updatePassword);
router.patch("/updateMe", authController.protect, updateMe);
router.delete("/deleteMe", authController.protect, deleteMe); 
router.put("/:id", updatUser);
router.delete("/:id", deleteUser);



module.exports = router;
