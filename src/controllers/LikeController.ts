import { Request, Response } from "express";
import { Like } from "../models/LikeModel";
import { db } from "../config/firebase";

// 이메일을 Firebase 경로에 안전한 문자열로 변환하는 함수
const encodeEmail = (email: string): string => {
  return email?.replace(/\./g, ",");
};

// 좋아요 추가
export const addLike = async (req: Request, res: Response): Promise<void> => {
  const { email, codename, title, date } = req.body as Like;
  const encodedEmail = encodeEmail(email);

  try {
    const likesRef = db.ref(`likes/${encodedEmail}`);
    const newLikeRef = likesRef.push();
    await newLikeRef.set({
      email,
      codename,
      title,
      date,
    });

    console.log("Like added: ", req.body);

    res.status(200).send("Like added successfully");
  } catch (error) {
    console.error("Error adding like: ", error);
    res.status(500).send("Error adding like");
  }
};

// 좋아요 삭제
export const removeLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, codename, title, date } = req.body as Like;
  const encodedEmail = encodeEmail(email);

  try {
    const likesRef = db.ref(`likes/${encodedEmail}`);
    const snapshot = await likesRef
      .orderByChild("codename")
      .equalTo(codename)
      .once("value");
    const likeToDelete = snapshot.val();

    if (likeToDelete) {
      const likeKey = Object.keys(likeToDelete).find(
        (key) =>
          likeToDelete[key].codename === codename &&
          likeToDelete[key].title === title &&
          likeToDelete[key].date === date
      );

      if (likeKey) {
        await likesRef.child(likeKey).remove();
        res.status(200).send("Like removed successfully");
      } else {
        console.log("Like not found with the specified details:", {
          email,
          codename,
          title,
          date,
        });
        res.status(204).send("Like not found");
      }
    } else {
      console.log("No likes found with codename:", codename);
      res.status(204).send("Like not found");
    }
  } catch (error) {
    console.error("Error removing like: ", error);
    res.status(500).send("Error removing like");
  }
};

// 이메일로 좋아요 목록 조회
export const getUserLikes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const encodedEmail = encodeEmail(email as string);

  try {
    const likesRef = db.ref(`likes/${encodedEmail}`);
    const snapshot = await likesRef.once("value");
    const likes = snapshot.val();

    if (likes) {
      const likeList = Object.values(likes);
      console.log(likeList);
      res.status(200).send(likeList);
    } else {
      res.status(204).send("No likes found");
    }
  } catch (error) {
    console.error("Error retrieving likes: ", error);
    res.status(500).send("Error retrieving likes");
  }
};

// 해당 게시물에 이 유저가 좋아요 눌렀는지 확인 true, false
export const checkLike = async (req: Request, res: Response): Promise<void> => {
  const { email, codename, title, date } = req.body as Like;
  const encodedEmail = encodeEmail(email);

  try {
    const likesRef = db.ref(`likes/${encodedEmail}`);
    const snapshot = await likesRef
      .orderByChild("codename")
      .equalTo(codename)
      .once("value");

    const likes = snapshot.val();
    if (likes) {
      const likeArray = Object.values(likes) as Like[];
      const likeExists = likeArray.some(
        (like) =>
          like.codename === codename &&
          like.title === title &&
          like.date === date
      );
      res.status(200).json({ liked: likeExists });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    console.error("Error checking like: ", error);
    res.status(500).json({ error: "Error checking like" });
  }
};
