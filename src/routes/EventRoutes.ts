import { Router } from "express";

const router = Router();

const {
  getCulturalEvents,
  getCulturalEventDetail,
} = require("../controllers/EventController");

// router.use(express.json());

router.get("/", getCulturalEvents);
router.get("/:id", getCulturalEventDetail);

module.exports = router;
