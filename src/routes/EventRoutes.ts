import { Router } from "express";

const router = Router();

const {
  getCulturalEvents,
  getCulturalEventDetail,
} = require("../controllers/EventController");

router.get("/", getCulturalEvents); // 조회, 검색
router.get("/:codename/:title/:date", getCulturalEventDetail); // 상세정보

module.exports = router;
