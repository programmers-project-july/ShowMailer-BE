import { Router } from "express";

const router = Router();

const { getCulturalEvents } = require("../controllers/EventController");

router.get("/", getCulturalEvents); // 목록 조회, 검색

module.exports = router;
