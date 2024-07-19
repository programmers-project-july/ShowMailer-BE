import { Request, Response } from "express";
import { Like } from "../models/LikeModel";
import { admin, db } from "../config/firebase";
export const addLike = async (req: Request, res: Response): Promise<void> => {
  const { userId, codename, title, date } = req.body;

  try {
    const likeRef = db
      .collection("likes")
      .doc(`${userId}_${codename}_${title}_${date}`);
    await likeRef.set({
      userId,
      codename,
      title,
      date,
    });
    res.status(200).send("Like added successfully");
  } catch (error) {
    res.status(500).send("Error adding like");
  }
};

// 좋아요 삭제
export const removeLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, codename, title, date } = req.body;

  try {
    const likeRef = db
      .collection("likes")
      .doc(`${userId}_${codename}_${title}_${date}`);
    await likeRef.delete();
    res.status(200).send("Like removed successfully");
  } catch (error) {
    res.status(500).send("Error removing like");
  }
};

// 좋아요 목록 조회
export const getLikes = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query;

  try {
    const likesSnapshot = await db
      .collection("likes")
      .where("userId", "==", userId)
      .get();
    const likes = likesSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).send("Error retrieving likes");
  }
};
