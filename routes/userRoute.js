const express = require("express");
const authController = require("./../controllers/authController");
const userController =require("./../controllers/userController")
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

router.use(authController.restrictTo("admin"))

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/signup", signup);
router.post("/login", login);
router.use(authController.protect);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword",  updatePassword);
router.patch("/updateMe",  updateMe);
router.delete("/deleteMe",  deleteMe); 
router.get("/me", authController.protect, userController.getMe, userController.getUser);
router.put("/:id", updatUser);
router.delete("/:id", deleteUser);



module.exports = router;
