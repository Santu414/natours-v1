const express = require("express");
const { protect, restrictTo } = require("./../controllers/authController");
const authController=require("./../controllers/authController")
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTop5Tours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/toursController");

router.get("/", authController.protect, getAllTours);
router.get("/top-5-tours", getTop5Tours);
router.get("/tour-stats", getTourStats);
router.get("/monthly-plan/:year", getMonthlyPlan);
router.get("/:id", getTour);
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin",'lead-guide'),
  deleteTour
);

module.exports = router;
 