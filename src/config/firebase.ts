import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json'; // 서비스 계정 키 파일 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com' // 실제 데이터베이스 URL로 대체
});

const db = admin.firestore();

export { admin, db };