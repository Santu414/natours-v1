const express = require("express");
const authController = require("../controllers/authController");
const reviewController=require("./../controllers/reviewController")


const router = express.Router({mergeParams:true});

//POST /tour/234fad4/reviews
//POST /reviews

//router.use(authController.protect)

router.get("/", reviewController.getAllReviews);
router.post(
  "/",
  
  authController.restrictTo("user"),
  reviewController.setTourUserIds,
  reviewController.createReviews
);

router.get("/:id", reviewController.getReviews);
router.delete(
  "/:id",
  authController.restrictTo("user", "admin"),
  reviewController.deleteReview
);
router.patch("/:id",authController.restrictTo("user","admin"), reviewController.upDateReview);


module.exports = router;
