const express = require("express");
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTop5Tours,
} = require("../controllers/toursController");
router.get("/", getAllTours);
router.get("/top-5-tours", getTop5Tours);
router.get("/:id", getTour);
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
