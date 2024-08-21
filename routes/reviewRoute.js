const express = require("express");
const authController = require("../controllers/authController");
const reviewController=require("./../controllers/reviewController")


const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.post("/", authController.protect,authController.restrictTo('user'),reviewController.createReviews);


module.exports = router;
