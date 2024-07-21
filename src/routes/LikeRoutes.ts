import { Router } from "express";
const router = Router();

const {
  addLike,
  removeLike,
  getUserLikes,
  checkLike,
} = require("../controllers/LikeController");

// Url을 어떻게 해야할지 고민
router.post("/add", addLike);
router.delete("/remove", removeLike);
router.get("/", getUserLikes);
router.get("/check", checkLike);

module.exports = router;
