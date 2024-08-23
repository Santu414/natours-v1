const express = require("express");
const authController = require("../controllers/authController");
const reviewController=require("./../controllers/reviewController")


const router = express.Router({mergeParams:true});

//POST /tour/234fad4/reviews
//POST /reviews

router.get("/", reviewController.getAllReviews);
router.post(
  "/",
  authController.protect,
  authController.restrictTo("user"),
  reviewController.setTourUserIds,
  reviewController.createReviews
);

router.get("/:id", reviewController.getReviews);
router.delete("/:id", reviewController.deleteReview);
router.patch("/:id", reviewController.upDateReview);


module.exports = router;
