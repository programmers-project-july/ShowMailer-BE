import * as admin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json"; // 서비스 계정 키 파일 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://dev-alarm-default-rtdb.firebaseio.com",
});

export const db = admin.database();
