import { Router } from "express";
const router = Router();

const {
  addLike,
  removeLike,
  getUserLikes,
  checkLike,
} = require("../controllers/LikeController");

router.post("/add", addLike);
router.delete("/remove", removeLike);
router.get("/check", checkLike);
router.get("/", getUserLikes);

module.exports = router;
