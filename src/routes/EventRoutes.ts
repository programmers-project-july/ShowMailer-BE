import { Router } from "express";

const router = Router();

const {
  getCulturalEvents,
  getCulturalEventDetail,
  // searchCulturalEvents,
} = require("../controllers/EventController");

// router.use(express.json());

router.get("/", getCulturalEvents);
router.get("/:codename/:title/:date", getCulturalEventDetail);
// router.get("/:codename/:title", searchCulturalEvents);

module.exports = router;
