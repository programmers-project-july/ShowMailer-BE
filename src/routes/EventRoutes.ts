import { Router } from "express";

const router = Router();

const {
  getCulturalEvents,
  getCulturalEventDetail,
} = require("../controllers/EventController");

// router.use(express.json());

router.get("/", getCulturalEvents);
router.get("/:codename/:title/:date", getCulturalEventDetail);

module.exports = router;
