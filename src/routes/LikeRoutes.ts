import { Router } from "express";

const router = Router();

const {
  addLike,
  removeLike,
  getUserLikes,
} = require("../controllers/LikeController");

// Url을 어떻게 해야할지 고민
router.post("/", addLike);
router.delete("/", removeLike);
router.get("/", getUserLikes);

module.exports = router;
