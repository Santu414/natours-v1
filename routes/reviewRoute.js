const express = require("express");
const authController = require("../controllers/authController");
const reviewController=require("./../controllers/reviewController")


const router = express.Router({mergeParams:true});

//POST /tour/234fad4/reviews
//POST /reviews

router.get("/", reviewController.getAllReviews);
router.post("/", authController.protect,authController.restrictTo('user'),reviewController.createReviews);

router.delete("/:id", reviewController.deleteReview);


module.exports = router;
