import { Request, Response } from 'express';
import { admin } from '../config/firebase';

export const googleLogin = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // 구글 ID 토큰을 검증하고 Firebase 사용자로 인증
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // 사용자 정보를 Firestore에서 조회하거나 없으면 새로 생성
    const userRef = admin.firestore().collection('users').doc(uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      const userData = {
        uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      await userRef.set(userData);
      res.status(201).send({ message: 'User created', user: userData });
    } else {
      res.status(200).send({ message: 'User already exists', user: doc.data() });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error verifying token', error });
  }
};